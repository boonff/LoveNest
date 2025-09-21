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

    event.recipes.create.milling({ id: 'create:crushed_raw_copper', chance: 0.75 }, 'anvilcraft:crab_claw')
    event.recipes.create.crushing(['create:crushed_raw_copper', { id: 'create:crushed_raw_copper', chance: 0.5 }], 'anvilcraft:crab_claw')

    event.recipes.create.compacting('minecraft:enchanted_golden_apple', 'minecraft:shulker_box[container=[{item:{count:64,id:"minecraft:gold_block"},slot:0},{item:{count:64,id:"minecraft:gold_block"},slot:1},{item:{count:64,id:"minecraft:gold_block"},slot:2},{item:{count:64,id:"minecraft:gold_block"},slot:3},{item:{count:64,id:"minecraft:gold_block"},slot:4},{item:{count:64,id:"minecraft:gold_block"},slot:5},{item:{count:64,id:"minecraft:gold_block"},slot:6},{item:{count:64,id:"minecraft:gold_block"},slot:7},{item:{count:64,id:"minecraft:gold_block"},slot:8},{item:{count:64,id:"minecraft:gold_block"},slot:9},{item:{count:64,id:"minecraft:gold_block"},slot:10},{item:{count:64,id:"minecraft:gold_block"},slot:11},{item:{count:64,id:"minecraft:gold_block"},slot:12},{item:{count:1,id:"minecraft:apple"},slot:13},{item:{count:64,id:"minecraft:gold_block"},slot:14},{item:{count:64,id:"minecraft:gold_block"},slot:15},{item:{count:64,id:"minecraft:gold_block"},slot:16},{item:{count:64,id:"minecraft:gold_block"},slot:17},{item:{count:64,id:"minecraft:gold_block"},slot:18},{item:{count:64,id:"minecraft:gold_block"},slot:19},{item:{count:64,id:"minecraft:gold_block"},slot:20},{item:{count:64,id:"minecraft:gold_block"},slot:21},{item:{count:64,id:"minecraft:gold_block"},slot:22},{item:{count:64,id:"minecraft:gold_block"},slot:23},{item:{count:64,id:"minecraft:gold_block"},slot:24},{item:{count:64,id:"minecraft:gold_block"},slot:25},{item:{count:64,id:"minecraft:gold_block"},slot:26}]]')
})
