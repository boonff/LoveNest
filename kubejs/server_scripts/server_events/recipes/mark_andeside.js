ServerEvents.recipes(event => {
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)


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
        [Fluid.of('foand:soulsteel', 250), Fluid.lava(100)])

    /*-----------注液配方-----------*/
    // 烈焰血 + 包裹 = 烈焰人头颅
    event.recipes.create.item_application('create:blaze_burner', ['create:empty_blaze_burner', 'create_dragons_plus:rare_blaze_pacakge'])


    // 把烈焰人头放到烈焰燃烧室中
    event.recipes.create.filling('create_dragons_plus:rare_blaze_pacakge', ['#create:packages', Fluid.of('foand:blaze', 1000)])
})
