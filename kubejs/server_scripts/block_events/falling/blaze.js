// 铁砧砸岩浆块召唤残血烈焰人（由 lovenest-mod AnvilLandBlaze.kt 移植）
//
// 行为：原版铁砧（普通/开裂/损坏）从高处落下，落地时下方是岩浆块
//   → 召唤 1 血、无掉落、无经验的烈焰人，铁砧降一级

BlockEvents.stoppedFalling(event => {
    const entity = event.entity
    const level = event.level
    if (!entity || !entity.onGround()) return

    const pos = entity.blockPosition()
    const state = entity.blockState

    // 必须是从空中落下的原版铁砧（普通/开裂/损坏）
    if (!isAnvil(state)) return

    // 下方必须是岩浆块
    if (level.getBlock(pos.offset(0, -1, 0)).id != 'minecraft:magma_block') return

    // 召唤前先发生一次爆炸（威力 2.0）
    level.createExplosion(pos.x + 0.5, pos.y, pos.z + 0.5)
        .strength(2.0)
        .causesFire(false)
        .explode()

    // 召唤残血烈焰人（1 血、无掉落、无经验）
    const blaze = level.createEntity('minecraft:blaze')
    blaze.setPosition(pos.x + 0.5, pos.y, pos.z + 0.5) // 用 setPosition 避免 moveTo 重载歧义
    blaze.setHealth(1)
    blaze.skipDropExperience() // 不掉经验
    blaze.spawn() // KubeJS 生成实体（addFreshEntity 可能静默失败）

    // 铁砧降级或消失
    anvilDamage(level, pos, state)

    entity.discard() // 删除掉落实体，避免重复触发
})

// 是否原版铁砧（普通/开裂/损坏）
function isAnvil(state) {
    const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')
    return state.is(Blocks.ANVIL)
        || state.is(Blocks.CHIPPED_ANVIL)
        || state.is(Blocks.DAMAGED_ANVIL)
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
