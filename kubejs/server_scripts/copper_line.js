ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    event.recipes.create.mixing([
        'anvilcraft:crab_trap',
        { id: 'anvilcraft:crab_claw', chance: 0.2 },
        { id: 'minecraft:seagrass', chance: 0.3 },
        { id: 'minecraft:kelp', chance: 0.1 }
    ], [Fluid.water(1000), 'anvilcraft:crab_trap'])

})
