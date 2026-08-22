// 虞美人西瓜（由 lovenest-mod 移植：PoppyMelonBlocks.kt）
// 方块：虞美人西瓜、虞美人西瓜沙、直虞美人西瓜苗、弯虞美人西瓜苗
//
// 直苗/弯苗：用 copyPropertiesFrom 复制原版西瓜苗的属性，
// 存活检查（下方必须是耕地）用 randomTick 模拟：
//   - 下方不是耕地（minecraft:farmland）→ 破坏并掉落 1 粒西瓜种子
//   - 直苗随机刻生长，成熟后向相邻沙/土结出虞美人西瓜
//   - 西瓜消失时弯苗恢复为直苗

const POPPY_DIRECTIONS = {
    'north': [0, 0, -1],
    'south': [0, 0, 1],
    'west': [-1, 0, 0],
    'east': [1, 0, 0]
}

// 虞美人西瓜方块
StartupEvents.registry('block', event => {
    event.create('foand:poppy_melon')
        .copyPropertiesFrom(Block.getBlock('minecraft:cake')) // 继承 DESTROY 活塞反应：被推即碎（对应 Kotlin 版 PushReaction.DESTROY）
        .hardness(1.0)                         // 与 Kotlin 版 strength(1.0f) 一致
        .resistance(1.0)                       // 爆炸抗性
        .requiresTool(false)
        .soundType('wood')                     // 木质音效
        .fullBlock(true)                       // 完整方块
        .opaque(true)                          // 不透明
        .tagBlock('minecraft:mineable/axe')    // 可用斧子挖掘
        .drops(() => [                         // 掉落 3~9 片（noDrops 会生成 null loot table，活塞推碎不掉落）
            ['foand:poppy_melon_slice'],
            { type: 'minecraft:uniform', min: 3, max: 9 }
        ])
})

// 虞美人西瓜沙（FallingBlock 移植）
StartupEvents.registry('block', event => {
    event.create('foand:poppy_melon_sand', 'falling')
        .hardness(0.5)
        .resistance(0.5)
        .requiresTool(false)
        .sandSoundType()                        // 沙子音效
        .fullBlock(true)
        .opaque(true)
        .tagBlock('minecraft:sand')             // 视为沙子
        .tagBlock('minecraft:mineable/shovel')  // 可用铲子挖掘
})

// 直虞美人西瓜苗
StartupEvents.registry('block', event => {
    event.create('foand:poppy_melon_stem')
        .copyPropertiesFrom(Block.getBlock('minecraft:melon_stem')) // 复制原版西瓜苗的属性
        .hardness(0.0)
        .resistance(0.0)
        .requiresTool(false)
        .grassSoundType()
        .fullBlock(false)
        .opaque(false)
        .box(6, 0, 6, 10, 12, 10)              // 缩小碰撞体积：4×12×4 像素居中（6 参数 box 为像素单位）
        .noItem()                               // 不作为物品存在（Kotlin 版未注册 BlockItem）
        .tagBlock('minecraft:replaceable_plant') // 可被其他方块替换
        .tagBlock('minecraft:mineable/hoe')     // 可用锄头挖掘
        .drops(() => [                          // 破坏时掉 1 粒西瓜种子
            ['minecraft:melon_seeds'],
            1
        ])
        .randomTick(event => {
            const pos = event.block.pos
            const level = event.level

            // 下方不是耕地时，秧苗掉落（掉 1 粒西瓜种子）
            if (level.getBlock(pos.offset(0, -1, 0)).id != 'minecraft:farmland') {
                level.destroyBlock(pos, true)
                return
            }

            // 随机选择一个水平方向
            const keys = Object.keys(POPPY_DIRECTIONS)
            const randomKey = keys[Math.floor(Math.random() * keys.length)]
            const offset = POPPY_DIRECTIONS[randomKey]

            // 茎相邻格子下方的方块需要是沙/土/虞美人西瓜沙，否则不生长
            const belowBlock = level.getBlock(pos.offset(offset[0], offset[1] - 1, offset[2]))
            if (!(belowBlock.hasTag('minecraft:sand')
                || belowBlock.hasTag('minecraft:dirt')
                || belowBlock.id == 'foand:poppy_melon_sand')) {
                return
            }

            // 茎相邻格子为空时，长出西瓜：弯苗 + 西瓜方块
            const fruitPos = pos.offset(offset[0], offset[1], offset[2])
            if (level.getBlock(fruitPos).id == 'minecraft:air') {
                level.getBlock(pos).set('foand:attached_poppy_melon_stem', { facing: randomKey })
                level.getBlock(fruitPos).set('foand:poppy_melon')
            }
        })
})

// 弯虞美人西瓜苗
StartupEvents.registry('block', event => {
    event.create('foand:attached_poppy_melon_stem')
        .copyPropertiesFrom(Block.getBlock('minecraft:melon_stem')) // 复制原版西瓜苗的属性
        .hardness(0.0)
        .resistance(0.0)
        .requiresTool(false)
        .grassSoundType()
        .fullBlock(false)
        .opaque(false)
        .box(6, 0, 6, 10, 12, 10)              // 缩小碰撞体积：4×12×4 像素居中（6 参数 box 为像素单位）
        .noItem()
        .property(BlockProperties.HORIZONTAL_FACING) // 弯苗朝向西瓜所在方向
        .tagBlock('minecraft:replaceable_plant')
        .tagBlock('minecraft:mineable/hoe')
        .drops(() => [                          // 破坏时掉 1 粒西瓜种子
            ['minecraft:melon_seeds'],
            1
        ])
        .randomTick(event => {
            const pos = event.block.pos
            const level = event.level

            // 下方不是耕地时，秧苗掉落（掉 1 粒西瓜种子）
            if (level.getBlock(pos.offset(0, -1, 0)).id != 'minecraft:farmland') {
                level.destroyBlock(pos, true)
                return
            }

            // 西瓜消失后，弯苗恢复为直苗
            const facing = event.block.properties.facing
            const offset = POPPY_DIRECTIONS[facing]
            const fruit = level.getBlock(pos.offset(offset[0], offset[1], offset[2]))
            if (fruit.id != 'foand:poppy_melon') {
                level.getBlock(pos).set('foand:poppy_melon_stem')
            }
        })
})
