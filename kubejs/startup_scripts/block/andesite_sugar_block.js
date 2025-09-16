// 使用方块事件注册新方块
StartupEvents.registry('block', event => {
    event.create('andesite_sugar_block')
        // 设置硬度
        .hardness(1.0)
        // 设置爆炸抗性
        .resistance(1.0)
        // 设置材质
        .soundType('sand')
        // 设置完整方块
        .fullBlock(true)
        // 设置不透明
        .opaque(true)
        .tagBlock('minecraft:mineable/shovel') // 可用铲子挖掘
})

