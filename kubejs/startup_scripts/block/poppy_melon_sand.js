// 使用方块事件注册新方块
StartupEvents.registry('block', event => {
    event.create('poppy_melon_sand', "falling")
        // 设置硬度
        .hardness(0.5)
        // 设置爆炸抗性
        .resistance(0.5)
        // 设置不可正确挖掘
        .requiresTool(true)
        // 设置材质
        .soundType('sand')
        // 设置完整方块
        .fullBlock(true)
        // 设置不透明
        .opaque(true)
        .tagBlock('minecraft:sand') // 添加沙子标签，使其具有沙子特性
        .tagBlock('minecraft:mineable/shovel') // 可用铲子挖掘
        .sandSoundType()    
})

