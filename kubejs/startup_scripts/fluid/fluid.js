StartupEvents.registry('fluid', event => {
    // 注册西瓜汁流体
    event.create('foand:poppy_melon_juice', 'thin')
        .tint(0xfd4f66)
        .noBucket()
        .noBlock()

    // 注册液态灵魂
    event.create('foand:soulsteel', 'thin')
        .stillTexture('foand:fluid.soulsteel.still')
        .flowingTexture('foand:fluid.soulsteel.flowing')
        
    // 注册烈焰血
    event.create('foand:blaze', 'thick')
        .stillTexture('foand:fluid.blaze.still')
        .flowingTexture('foand:fluid.blaze.flowing')
})
