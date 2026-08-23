// 铁砧落地引雷（由 lovenest-mod AnvilLandLightning.kt 移植）
//
// 布局（自下而上）：地面铁十字（5 块铁）→ 十字中心上方 1 格插避雷针 → 铁砧从高处落下砸中避雷针
//
// 行为：
//   - 原版铁砧（普通/开裂/损坏）落中避雷针：80% 成功 → 引雷 + 铁砧降一级
//                                     20% 失败 → 破坏避雷针 + 爆炸（威力 2、引火）
//   - 非原版铁砧（模组铁砧等）：直接破坏避雷针 + 爆炸

const CROSS_SHAPE = [
    [0, -2, 0],
    [1, -2, 0],
    [0, -2, 1],
    [-1, -2, 0],
    [0, -2, -1]
]

BlockEvents.stoppedFalling(event => {
    const entity = event.entity
    const level = event.level
    if (!entity || !entity.onGround()) return

    const pos = entity.blockPosition()
    const state = entity.blockState

    // 必须是从空中落下的铁砧（#minecraft:anvil）
    if (!state.is(Java.loadClass('net.minecraft.tags.BlockTags').ANVIL)) return

    // 下方必须是避雷针
    if (level.getBlock(pos.offset(0, -1, 0)).id != 'minecraft:lightning_rod') return

    // 避雷针下方 1 格必须是铁十字（中心 + 四向铁块）
    if (!isIronCross(level, pos)) return

    if (isNormalAnvil(state)) {
        spawnLightning(level, pos)
        anvilDamage(level, pos, state)
        // 80% 成功，20% 失败惩罚（破坏避雷针 + 爆炸）
        if (Math.random() >= 0.8) punish(level, pos)
    } else {
        punish(level, pos)
    }

    entity.discard() // 删除掉落实体，避免重复触发
})

// 检查铁十字：铁砧落点下方 2 格的十字形铁块
function isIronCross(level, pos) {
    return CROSS_SHAPE.every(offset =>
        level.getBlock(pos.offset(offset[0], offset[1], offset[2])).id == 'minecraft:iron_block')
}

// 是否原版铁砧（普通/开裂/损坏）
function isNormalAnvil(state) {
    const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')
    return state.is(Blocks.ANVIL)
        || state.is(Blocks.CHIPPED_ANVIL)
        || state.is(Blocks.DAMAGED_ANVIL)
}

// 在铁砧落点生成闪电
function spawnLightning(level, pos) {
    const bolt = level.createEntity('minecraft:lightning_bolt')
    bolt.setPosition(pos.x + 0.5, pos.y, pos.z + 0.5)
    bolt.spawn()
}

// 铁砧降级：普通 → 开裂 → 损坏 → 消失
function anvilDamage(level, pos, state) {
    const AnvilBlock = Java.loadClass('net.minecraft.world.level.block.AnvilBlock')
    const newState = AnvilBlock.damage(state)
    if (newState != null) {
        level.setBlock(pos, newState, 3) // 原生 setBlock，保留 facing 等状态
    } else {
        level.removeBlock(pos, false)
    }
}

// 惩罚：破坏避雷针 + 爆炸（威力 2，引火，TNT 类型）
function punish(level, pos) {
    level.destroyBlock(pos.offset(0, -1, 0), false) // 破坏避雷针（不掉落）
    const ExplosionInteraction = Java.loadClass('net.minecraft.world.level.Level$ExplosionInteraction')
    level.createExplosion(pos.x + 0.5, pos.y - 1.0, pos.z + 0.5)
        .strength(4)
        .causesFire(true)
        .explosionMode(ExplosionInteraction.TNT)
        .explode()
}
