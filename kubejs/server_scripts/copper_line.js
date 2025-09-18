ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    event.recipes.create.filling('2x anvilcraft:crab_claw', [Fluid.water(1000), 'anvilcraft:crab_trap'])
})
