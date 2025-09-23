StartupEvents.registry('block', event => {
    // 糖块
    event.create('anvilcraft:sugar_block')
        .hardness(1.0)       // 硬度
        .resistance(1.0)     // 爆炸抗性
        .soundType('sand')   // 材质
        .fullBlock(true)     // 完整方块
        .opaque(true)        // 不透明   
        .tagBlock('minecraft:mineable/shovel') // 可用铲子挖掘

    // 安山糖块
    event.create('foand:andesite_sugar_block')
        .hardness(1.0)       // 硬度
        .resistance(1.0)     // 爆炸抗性
        .soundType('sand')   // 材质
        .fullBlock(true)     // 完整方块
        .opaque(true)        // 不透明
        .tagBlock('minecraft:mineable/shovel') // 可用铲子挖掘
})

