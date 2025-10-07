ServerEvents.recipes(event => {
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)

    event.recipes.create.compacting(Fluid.of('foand:extract_oil', 20), 'minecraft:slime_ball').heated()
    event.recipes.create.mixing(Fluid.of('foand:iodine_extract_oil', 5), ['minecraft:dried_kelp', Fluid.of('foand:extract_oil', 5)])

    event.recipes.create.mixing('foand:iodine', Fluid.of('foand:iodine_extract_oil', 1000)).heated()

    event.recipes.create.mixing([Fluid.of('foand:zinc_iodide_solution', 250), 'minecraft:green_dye'], [Fluid.water(250), 'foand:iodine', 'minecraft:cactus'])
    event.recipes.create.mixing(['foand:iodine', 'create:crushed_raw_zinc'], [Fluid.of('foand:zinc_iodide_solution', 250)]).heated()

    // 烈焰人相关配方
    event.recipes.create.mixing(Fluid.of('foand:blaze', 50), [Fluid.of('foand:soulsteel', 250), Fluid.lava(100)])

    const blaze_head = 'foand:blaze_head'
    event.recipes.create.item_application(
        'create:blaze_burner',
        ['create:empty_blaze_burner', blaze_head]
    )

    event.recipes.create.filling(blaze_head, ['#create:packages', Fluid.of('foand:blaze', 1000)])
})