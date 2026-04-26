StartupEvents.registry('fluid', event => {
    event.create('foand:poppy_melon_juice', 'thin')// 西瓜汁流体
        .tint(0xfd4f66)
        .noBlock()

    event.create('foand:soul_juice')// 液态灵魂
        .stillTexture('foand:fluid/soul_juice/still')
        .flowingTexture('foand:fluid/soul_juice/flowing')
        .noBlock()

    event.create('foand:blaze')// 烈焰血
        .stillTexture('foand:fluid/blaze/still')
        .flowingTexture('foand:fluid/blaze/flowing')
        .noBlock()

    event.create('foand:zinc_iodide_solution', 'thin') // 碘化锌溶液
        .tint(0xa1f8e1)
        .noBlock()

    event.create('foand:slime') // 粘液流体
        .stillTexture('foand:fluid/slime/still')
        .flowingTexture('foand:fluid/slime/flowing')
        .noBlock()
    event.create('foand:iodine_slime') // 含碘粘液 
        .stillTexture('foand:fluid/iodine_slime/still')
        .flowingTexture('foand:fluid/iodine_slime/flowing')
        .noBlock()
})
