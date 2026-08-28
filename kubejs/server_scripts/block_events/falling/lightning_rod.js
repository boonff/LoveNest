// 铁砧落地引雷
//
// 行为：原版铁砧（普通/开裂/损坏）从高处落下，落点正下方是避雷针，
//       避雷针下方一层是铁十字（中心 + 东南西北 4 块铁）
//   → 80%：落点生成闪电，铁砧降一级
//   → 20%：惩罚（破坏避雷针 + 爆炸）
//   非原版铁砧（不在 #minecraft:anvil 里，如 AnvilCraft 铁砧）→ 直接惩罚
//
// 注意：本整合包的 Rhino 引擎（rhino 2101.2.8）有 bug——函数内 try 块里声明 const
//       会抛 "redeclaration of var X"，所以本文件所有 const 都写在 try 外面；
//       另外 pos.offset(x, y, z) 的 x/z 偏移不生效，坐标偏移请用
//       below / above / north / south / east / west。

BlockEvents.stoppedFalling(event => {
    const entity = event.entity
    const level = event.level
    if (!entity || !entity.onGround()) return

    const pos = entity.blockPosition()
    const state = entity.blockState

    // 必须是从空中落下的铁砧（原版三个 + #minecraft:anvil tag）
    if (!isRodAnvil(state)) return

    // 正下方必须是避雷针
    if (level.getBlock(pos.below(1)).id != 'minecraft:lightning_rod') return

    // 避雷针下方必须是铁十字
    if (!isIronCross(level, pos)) return

    // 原版铁砧：80% 引雷降级 / 20% 惩罚；模组铁砧：直接惩罚
    if (isVanillaAnvil(state)) {
        if (Math.random() < 0.8) {
            spawnLightning(level, pos)
            rodAnvilDamage(level, pos, state)
        } else {
            punish(level, pos)
        }
    } else {
        punish(level, pos)
    }

    entity.discard() // 删除掉落实体，避免重复触发
})


// ======================================================
// 判断是否属于 #minecraft:anvil（原版三个铁砧 + tag 检查）
// ======================================================

function isRodAnvil(state) {
    if (isVanillaAnvil(state)) return true

    // 非原版铁砧：检查 #minecraft:anvil tag（例如 AnvilCraft 铁砧）
    // 1.21.1 的 BlockState.getTags() 返回 Java Stream，需 toList() 后遍历
    let tagList = null
    try {
        tagList = state.getTags().toList()
    } catch (error) {
        return false
    }

    if (tagList != null) {
        for (let i = 0; i < tagList.size(); i++) {
            if (String(tagList.get(i).location()) == 'minecraft:anvil') {
                return true
            }
        }
    }

    return false
}


// ======================================================
// 检查铁十字：中心（铁砧下方 2 格）+ 同一层东南西北 4 块铁
// ======================================================

function isIronCross(level, pos) {
    const center = pos.below(2)
    const arms = [
        center.east(1),
        center.south(1),
        center.west(1),
        center.north(1)
    ]

    if (level.getBlock(center).id != 'minecraft:iron_block') return false

    for (let i = 0; i < arms.length; i++) {
        if (level.getBlock(arms[i]).id != 'minecraft:iron_block') return false
    }

    return true
}


// ======================================================
// 是否原版铁砧
// ======================================================

function isVanillaAnvil(state) {
    const id = state.id

    return id == 'minecraft:anvil'
        || id == 'minecraft:chipped_anvil'
        || id == 'minecraft:damaged_anvil'
}


// ======================================================
// 生成闪电
// ======================================================

function spawnLightning(level, pos) {
    let bolt = null

    try {
        bolt = level.createEntity('minecraft:lightning_bolt')
        bolt.setPosition(pos.x + 0.5, pos.y, pos.z + 0.5)
        bolt.spawn()
    } catch (error) {
        console.error('[AnvilLandLightning] spawnLightning ERROR = ' + error)
    }
}


// ======================================================
// 铁砧降级：普通 → 开裂 → 损坏 → 消失
// ======================================================

function rodAnvilDamage(level, pos, state) {
    const AnvilBlock =
        Java.loadClass('net.minecraft.world.level.block.AnvilBlock')

    let newState = null

    try {
        newState = AnvilBlock.damage(state)

        if (newState != null) {
            level.setBlock(pos, newState, 3) // 原生 setBlock，保留 facing 等状态
        } else {
            level.removeBlock(pos, false)
        }
    } catch (error) {
        console.error('[AnvilLandLightning] rodAnvilDamage ERROR = ' + error)
    }
}


// ======================================================
// 惩罚：破坏避雷针并爆炸
// ======================================================

function punish(level, pos) {
    const punishPos = pos.below(1)

    const ExplosionInteraction =
        Java.loadClass('net.minecraft.world.level.Level$ExplosionInteraction')

    try {
        level.destroyBlock(punishPos, false)

        level.explode(
            null,
            pos.x + 0.5,
            pos.y,
            pos.z + 0.5,
            2.0,
            true,
            ExplosionInteraction.TNT
        )
    } catch (error) {
        console.error('[AnvilLandLightning] punish ERROR = ' + error)
    }
}
