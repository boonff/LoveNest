// 罂粟西瓜方块
StartupEvents.registry('block', event => {
    event.create('poppy_melon')               // 设置方块 ID
        .hardness(1.0)                        // 设置硬度
        .resistance(1.0)                      // 设置爆炸抗性
        .requiresTool(false)                  // 设置不可正确挖掘
        .soundType('wood')                     // 设置材质
        .fullBlock(true)                       // 设置完整方块
        .opaque(true)                          // 设置不透明
        .tagBlock('minecraft:sword_efficient') // 可用剑高效挖掘
        .tagBlock('minecraft:mineable/axe')   // 可用斧子挖掘
        .drops(() => [                         // 设置掉落
            ['kubejs:poppy_melon_slice'], { type: 'minecraft:uniform', min: 3, max: 7 }
        ])
})

// 罂粟西瓜沙子方块
StartupEvents.registry('block', event => {
    event.create('poppy_melon_sand', "falling") // 设置方块 ID，类型为 FallingBlock
        .hardness(0.5)                          // 设置硬度
        .resistance(0.5)                        // 设置爆炸抗性
        .requiresTool(false)                     // 设置不可正确挖掘
        .soundType('sand')                       // 设置材质
        .fullBlock(true)                         // 设置完整方块
        .opaque(true)                            // 设置不透明
        .tagBlock('minecraft:sand')              // 添加沙子标签，使其具有沙子特性
        .tagBlock('minecraft:mineable/shovel')  // 可用铲子挖掘
        .sandSoundType()                         // 设置沙子踩踏声音
})

// 直罂粟西瓜苗
StartupEvents.registry('block', event => {
    event.create('poppy_melon_stem')
        .hardness(0.0)
        .resistance(0.0)
        .requiresTool(false)
        .soundType('grass')
        .fullBlock(false)
        .opaque(false)
        .noCollision() // 设置无碰撞箱
        .tagBlock('minecraft:replaceable_plant') // 可被其他方块替换
        .tagBlock('minecraft:mineable/hoe') // 可用锄头挖掘
})

// 弯罂粟西瓜苗
StartupEvents.registry('block', event => {
    event.create('poppy_attached_melon_stem')
        .hardness(0.0)
        .resistance(0.0)
        .requiresTool(false)
        .soundType('grass')
        .fullBlock(false)
        .opaque(false)
        .noCollision() // 设置无碰撞箱
        .tagBlock('minecraft:replaceable_plant') // 可被其他方块替换
        .tagBlock('minecraft:mineable/hoe') // 可用锄头挖掘
})
