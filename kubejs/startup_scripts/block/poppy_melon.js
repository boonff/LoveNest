// 使用方块事件注册新方块
StartupEvents.registry('block', event => {
    event.create('poppy_melon')
        // 设置硬度
        .hardness(1.0)
        // 设置爆炸抗性
        .resistance(1.0)
        // 设置不可正确挖掘
        .requiresTool(false)
        // 设置材质
        .soundType('wood')
        // 设置完整方块
        .fullBlock(true)
        // 设置不透明
        .opaque(true)
        .tagBlock('minecraft:sword_efficient')
        .tagBlock('minecraft:mineable/axe') // 可用斧子挖掘
        .drops(() => [
            ['kubejs:poppy_melon_slice'], { type: 'minecraft:uniform', min: 3, max: 7 }
        ])
})

