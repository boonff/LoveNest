# LoveNest Modpack — KubeJS 开发技能

## 目的
为 LoveNest 整合包（Minecraft 1.21.1 NeoForge）的 KubeJS 开发提供标准化流程与最佳实践，涵盖方块/物品/流体注册、Create & AnvilCraft 配方编写、世界生成配置、事件处理及调试方法。

## 适用场景
- 新增或修改自定义方块、物品、流体（`startup_scripts/block/`、`startup_scripts/item/`、`startup_scripts/fluid/`）
- 编写或调试 Create 机械配方（`server_scripts/server_events/recipes/`）
- 编写或调试 AnvilCraft 处理配方（同目录）
- 配置世界生成（`data/foand/worldgen/`）：生物群系、地物、结构、噪声设置
- 编写方块交互事件（`server_scripts/block_events/`）：放置、破坏、点击
- 修改已有模组的物品/方块行为（`startup_scripts/modification/`）
- 编写 Ponder 场景教程（`client_scripts/ponder/`）

## 产出（目标结果）
- 功能完整的自定义内容（方块/物品/流体/配方/世界生成）能够正确加载并在游戏中生效
- 代码遵循本项目的约定模式（Unit 注册、配方快捷链式调用、命名空间 `foand`）

## 操作步骤（逐步流程）

### 1. 新增自定义方块/物品/流体
1. 在 `startup_scripts/block/`、`startup_scripts/item/` 或 `startup_scripts/fluid/` 中创建新的 JS 文件
2. 使用 `StartupEvents.registry()` 注册，按需设置属性（`soundType`、`mapColor`、`hardness` 等）
3. 在 `assets/foand/models/block/` 和 `assets/foand/models/item/` 添加模型文件
4. 在 `assets/foand/textures/` 对应子目录添加材质贴图
5. 在 `assets/foand/lang/zh_cn.json` 添加中文译名
6. 如果是流体，还需在 `assets/foand/textures/fluid/` 下添加 `still.png` 和 `flowing.png` 及其 `.mcmeta`

### 2. 编写配方
1. 在 `server_scripts/server_events/recipes/` 下找到或创建对应的生产线文件（如 `line_iron.js`、`line_brass.js`）
2. 使用 `ServerEvents.recipes` 事件，通过 `event.custom()` 创建自定义配方
3. 使用本项目封装的快捷 API：
   - `event.recipes.create.xxx(outputs, inputs)` — Create 配方（支持 `.heated()`、`.superheated()`、`.processingTime()` 链式调用）
   - `event.recipes.anvilcraft.xxx(custom)` — AnvilCraft 配方
   - `event.recipes.create.sequenced_assembly(outputs, input, sequence)` — 序列装配（支持 `.loops()`、`.transitionalItem()`）
   - `event.recipes.create.mechanical_crafting(output, pattern, key)` — 机械手工艺

### 3. 配置世界生成
1. 在 `data/foand/worldgen/` 下按类型管理文件：
   - `biome/` — 自定义生物群系
   - `configured_feature/` — 已配置地物
   - `placed_feature/` — 已放置地物
   - `noise_settings/` — 噪声设置
   - `structure/` — 结构定义
   - `template_pool/` — 模板池（拼图结构）
2. 在 `data/minecraft/dimension/` 和 `data/minecraft/dimension_type/` 修改维度配置
3. 在 `data/minecraft/tags/` 中添加标签（如生物群系标签）

### 4. 编写方块交互事件
1. 在 `server_scripts/block_events/` 下创建事件文件
2. `placed.js` — 方块放置事件
3. `broken/` — 方块破坏事件
4. `clicked/` — 方块右键点击事件

### 5. 调试与验证
1. 使用 `/kubejs reload startup_scripts` 重载启动脚本
2. 使用 `/kubejs reload server_scripts` 重载服务端脚本
3. 检查日志是否有报错（堆栈跟踪指向问题行号）
4. 使用 ProbeJS 查看注册内容 (`/probejs dump`)
5. 使用 JEI 检查配方是否正确注册

## 决策点与分支逻辑
- **新增 vs 修改**：全新内容在 `startup_scripts/block/item/fluid/` 创建新文件；修改已有模组内容在 `startup_scripts/modification/` 操作
- **Create vs AnvilCraft**：机械自动化流程用 Create 配方；多步骤材料处理用 AnvilCraft（如 `block_crush`、`stamping`、`boiling`）
- **配方文件拆分**：按生产线分文件（`line_iron.js`、`line_brass.js`、`line_andesite.js` 等），避免单个文件过大
- **世界生成类型选择**：自然界特征用 `configured_feature` + `placed_feature`；建筑类用 `structure` + `template_pool`

## 完成标准（质量准则）
- [ ] 所有注册内容在 `/kubejs reload` 后无报错
- [ ] 方块/物品/流体有正确的模型和材质
- [ ] 配方在 JEI 中可见且可合成
- [ ] 事件处理逻辑正确，无 `TypeError` 或 `ReferenceError`
- [ ] 中文译名已添加到 `zh_cn.json`
- [ ] 世界生成内容在对应维度中正常生成
- [ ] 代码遵循项目的链式调用风格和命名约定

## 架构参考
```
LoveNest/
├── kubejs/
│   ├── startup_scripts/          # 启动时注册
│   │   ├── block/                # 自定义方块注册
│   │   ├── item/                 # 自定义物品注册
│   │   ├── fluid/                # 自定义流体注册
│   │   ├── modification/         # 修改已有模组内容
│   │   └── unit/                 # 工具库（配方快捷 API）
│   │       ├── anvilcraft.js     # AnvilCraft 配方封装
│   │       └── create_recipes.js # Create 配方封装
│   ├── server_scripts/           # 服务端逻辑
│   │   ├── block_events/         # 方块事件
│   │   ├── loot/                 # 战利品表
│   │   └── server_events/
│   │       └── recipes/          # 配方定义
│   ├── client_scripts/
│   │   └── ponder/               # Ponder 场景
│   ├── assets/foand/             # 资源文件
│   │   ├── models/               # 模型
│   │   ├── textures/             # 材质
│   │   └── lang/zh_cn.json       # 中文翻译
│   └── data/foand/worldgen/      # 世界生成数据
└── mods/                         # 模组文件
```

## 示例提示
- **快速**："在 `startup_scripts/block/` 中新建一个硬度为 3 的矿石方块，注册到 `foand` 命名空间"
- **标准**："为 LoveNest 添加一条新的生产线：用安山岩在 AnvilCraft 粉碎机中产出安山岩粉，然后通过 Create 洗涤获得铁粒，写在 `line_andesite.js` 中"
- **详细**："在当前整合包的自定义下界维度中添加一种新的地物：灵魂沙层中随机生成灵魂汁液涌泉，需要配置 `configured_feature` 和 `placed_feature`，并将该地物关联到 `sky_nether` 生物群系"

## 常见问题与解决
| 问题 | 原因 | 解决 |
|------|------|------|
| 配方不显示 | 类型字符串错误 | 检查 `type: "create:xxx"` 或 `type: "anvilcraft:xxx"` 拼写 |
| 方块无材质 | 模型路径不匹配 | `models/block/` 中的纹理路径需与 `textures/block/` 一致 |
| 流体不流动 | 缺少 `.mcmeta` | 确保 `still.png.mcmeta` 和 `flowing.png.mcmeta` 存在 |
| 事件未触发 | 事件类型不对 | 检查使用正确的 `BlockEvents.placed`/`broken`/`rightClicked` |