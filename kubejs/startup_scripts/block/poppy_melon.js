// 虞美人西瓜（由 lovenest-mod 移植：PoppyMelonBlocks.kt）
// 方块：虞美人西瓜、虞美人西瓜沙、直虞美人西瓜苗、弯虞美人西瓜苗

const POPPY_DIRECTIONS = {
    'north': [0, 0, -1],
    'south': [0, 0, 1],
    'west': [-1, 0, 0],
    'east': [1, 0, 0]
}

// 虞美人西瓜方块
StartupEvents.registry('block', event => {
    event.create('foand:poppy_melon')
        .hardness(1.0)                         // 与 Kotlin 版 strength(1.0f) 一致
        .resistance(1.0)                       // 爆炸抗性
        .requiresTool(false)
        .soundType('wood')                     // 木质音效
        .fullBlock(true)                       // 完整方块
        .opaque(true)                          // 不透明
        .tagBlock('minecraft:mineable/axe')    // 可用斧子挖掘
        .noDrops()                             // 掉落交给 LootJS：精准采集掉本体，否则掉 3~7 片
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

// 直虞美人西瓜苗（StemBlock 移植）
StartupEvents.registry('block', event => {
    event.create('foand:poppy_melon_stem')
        .hardness(0.0)
        .resistance(0.0)
        .requiresTool(false)
        .grassSoundType()
        .fullBlock(false)
        .opaque(false)
        .noCollision()                          // 无碰撞箱
        .noItem()                               // 不作为物品存在（Kotlin 版未注册 BlockItem）
        .tagBlock('minecraft:replaceable_plant') // 可被其他方块替换
        .tagBlock('minecraft:mineable/hoe')     // 可用锄头挖掘
        .drops(() => ['minecraft:melon_seeds']) // 掉西瓜种子
        .randomTick(event => {
            const pos = event.block.pos
            const level = event.level
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

// 弯虞美人西瓜苗（AttachedStemBlock 移植）
StartupEvents.registry('block', event => {
    event.create('foand:attached_poppy_melon_stem')
        .hardness(0.0)
        .resistance(0.0)
        .requiresTool(false)
        .grassSoundType()
        .fullBlock(false)
        .opaque(false)
        .noCollision()
        .noItem()
        .property(BlockProperties.HORIZONTAL_FACING) // 弯苗朝向西瓜所在方向
        .tagBlock('minecraft:replaceable_plant')
        .tagBlock('minecraft:mineable/hoe')
        .drops(() => ['minecraft:melon_seeds'])
})
