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
        .tagBlock('minecraft:wood') 
        .tagBlock('minecraft:mineable/axe') // 可用斧子挖掘
        .item(() => {})
        // .drops(pool => {
        //     pool.rolls = 1; // 一次掉落
        //     pool.addItem('kubejs:poppy_melon_slice', 1) // 物品为西瓜片
        //         .applyBonus(3, 7) // 设置数量范围，但是注意：applyBonus函数通常用于附魔时增加掉落，这里我们不需要附魔效果，而是直接随机数量
        //         .randomChance(1.0); // 掉落几率100%)
        // })
})

