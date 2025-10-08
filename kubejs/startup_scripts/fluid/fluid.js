StartupEvents.registry('fluid', event => {
    // 注册西瓜汁流体
    event.create('foand:poppy_melon_juice', 'thin')
        .tint(0xfd4f66)
        .noBlock()

    // 注册液态灵魂
    event.create('foand:soulsteel', 'thin')
        .stillTexture('foand:fluid/soulsteel/still')
        .flowingTexture('foand:fluid/soulsteel/flowing')
        .tint(0xffffff)
        .noBlock()

    // 注册烈焰血
    event.create('foand:blaze', 'thick')
        .stillTexture('foand:fluid/blaze/still')
        .flowingTexture('foand:fluid/blaze/flowing')
        .tint(0xffffff)
        .noBlock()

    // 注册萃取液
    event.create('foand:extract_oil', 'thin')
        .tint(0xd7f8a1)
        .noBlock()
    // 注册含碘萃取液
    event.create('foand:iodine_extract_oil', 'thin')
        .tint(0xfd4f66)
        .noBlock()
    // 注册碘化锌溶液
    event.create('foand:zinc_iodide_solution', 'thin')
        .tint(0xa1f8e1)
        .noBlock()
    
})
