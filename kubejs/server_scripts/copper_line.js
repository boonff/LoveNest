ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    event.recipes.create.mixing(['anvilcraft:crab_trap', 'anvilcraft:crab_claw'], [Fluid.water(1000), 'anvilcraft:crab_trap'])

})
