ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    event.recipes.create.mixing([
        'anvilcraft:crab_trap',
        { id: 'anvilcraft:crab_claw', chance: 0.2 },
        { id: 'minecraft:seagrass', chance: 0.3 },
        { id: 'minecraft:kelp', chance: 0.1 }
    ], [Fluid.water(1000), 'anvilcraft:crab_trap'])

    event.recipes.create.mixing([
        'anvilcraft:crab_trap',
        'anvilcraft:crab_claw'
    ], [
        {
            type: 'fluid_stack',
            fluid: 'create:potion',
            amount: 1000,
            components: {
                'create:potion_fluid_bottle_type': "regular",
                'minecraft:potion_contents': { potion: 'minecraft:awkward' }
            }
        },
        'anvilcraft:crab_trap'
    ])

    event.recipes.create.milling('create:crushed_raw_copper', 'anvilcraft:crab_claw');
    event.recipes.anvilcraft.item_crush('anvilcraft:crab_claw', ChanceItemStack.of('create:crushed_raw_copper'));
    event.recipes.create.crushing(['create:crushed_raw_copper', { id: 'create:crushed_raw_copper', chance: 0.5 }], 'anvilcraft:crab_claw');
})
