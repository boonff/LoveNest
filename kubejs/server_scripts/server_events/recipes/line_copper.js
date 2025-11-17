ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    /*---------------------- 工作台 --------------------*/
    event.shaped('anvilcraft:crab_trap', [
        'BAB',
        'A A',
        'BAB'
    ], {
        A: 'foand:bamboo_string',
        B: 'minecraft:stick'
    }) // 蟹笼

    /*---------------------- 搅拌 ----------------------*/
    event.recipes.create.mixing([
        'anvilcraft:crab_trap',
        { id: 'anvilcraft:crab_claw', chance: 0.2 },
        { id: 'minecraft:seagrass', chance: 0.3 },
        { id: 'minecraft:kelp', chance: 0.1 }
    ], [Fluid.water(1000), 'anvilcraft:crab_trap'])

    /*--------------------- 物品粉碎 ---------------------*/
    event.custom({
        "type": "anvilcraft:item_crush",
        "ingredients": [
            {
                "items": 'anvilcraft:crab_claw'
            }
        ],
        "results": [
            {
                "count": 1,
                "id": 'create:crushed_raw_copper'
            }
        ]
    }) //蟹钳 -> 粉碎铜

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
    /*-------------------------- 研磨 -------------------------*/
    event.recipes.create.milling('create:crushed_raw_copper', 'anvilcraft:crab_claw') //蟹钳 -> 粉碎铜矿石
    /*------------------------- 粉碎 -------------------------*/
    event.recipes.create.crushing(['create:crushed_raw_copper',
        { id: 'create:crushed_raw_copper', chance: 0.5 }], 'anvilcraft:crab_claw') //蟹钳 -> 粉碎铜矿石x1-2
})
