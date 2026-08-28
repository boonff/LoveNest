ServerEvents.recipes(event => {
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)

    /*--------------------辊压------------------------*/
    //糖块 + 安山岩 -> 安山糖块
    event.recipes.create.compacting('foand:andesite_sugar_block',
        ['minecraft:andesite', 'anvilcraft:sugar_block'])
    // 删除搅拌生成安山合金的配方
    event.remove({ output: 'create:andesite_alloy', type: 'create:mixing' })
    // 安山糖 + 罂粟西瓜汁1000mb -> 安山合金
    event.recipes.create.compacting('create:andesite_alloy_block',
        [Fluid.of('foand:poppy_melon_juice', `1000`), 'foand:andesite_sugar_block'])
    event.recipes.create.compacting('foand:andesite_sugar_block', ['minecraft:andesite', 'anvilcraft:sugar_block'])

    /*---------------------搅拌--------------------------*/
    // 罂 
    event.recipes.create.mixing(Fluid.of('foand:poppy_melon_juice', 1000),
        'foand:poppy_melon_sand')
    event.recipes.create.mixing('anvilcraft:sugar_block', ['foand:poppy_melon_sand', Fluid.of('minecraft:water', 250)])

    /*----------搅拌配方----------*/
    // 加热搅拌 粘液球 
    event.recipes.create.mixing(Fluid.of('foand:slime', 20), 'minecraft:slime_ball').heated()
    // 干海带 + 粘液流体 = 含碘溶液
    event.recipes.create.mixing(Fluid.of('foand:iodine_slime', 5),
        ['minecraft:dried_kelp', Fluid.of('foand:slime', 5)])
    // 加热搅拌 含碘溶液 = 碘晶体
    event.recipes.create.mixing('foand:iodine', Fluid.of('foand:iodine_slime', 1000)).heated()
    // 碘晶体 + 水 + 仙人掌 = 碘化锌溶液 + 绿色染料
    event.recipes.create.mixing([Fluid.of('foand:zinc_iodide_solution', 250), 'minecraft:green_dye'],
        [Fluid.water(250), 'foand:iodine', 'minecraft:cactus'])
    // 加热搅拌 碘化锌溶液 = 碘 + 粉碎锌
    event.recipes.create.mixing([{ id: 'foand:iodine', chance: 0.99 }, 'create:crushed_raw_zinc'],
        [Fluid.of('foand:zinc_iodide_solution', 250)]).heated()
    // 灵魂汁 + 熔岩 = 烈焰血
    event.recipes.create.mixing(Fluid.of('foand:blaze', 50),
        [Fluid.of('foand:soul_juice', 250), Fluid.lava(100)])

    /*-----------注液配方-----------*/
    // 烈焰血 + 包裹 = 烈焰人头颅
    event.recipes.create.item_application('create:blaze_burner', ['create:empty_blaze_burner', 'create_dragons_plus:rare_blaze_pacakge'])


    // 把烈焰人头放到烈焰燃烧室中
    event.recipes.create.filling('create_dragons_plus:rare_blaze_pacakge', ['#create:packages', Fluid.of('foand:blaze', 1000)])
})
