ServerEvents.recipes(event => {
    // 初始化全局配方
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)

    /*--------------------------------工作台 --------------------------------*/
    //竹板
    event.shaped('minecraft:bamboo_planks', [
        'AA',
        'AA'
    ], {
        A: 'minecraft:bamboo'
    })
    //竹块
    event.remove({ output: 'minecraft:bamboo_block' })
    event.shaped('minecraft:bamboo_block', [
        'AAA',
        'A A',
        'AAA'
    ], {
        A: 'minecraft:bamboo'
    })
    // 竹子 -> 竹线
    event.shaped("foand:bamboo_string", ['A'], { A: 'minecraft:bamboo' })
    // 传送带（竹线制作）
    event.remove({ output: 'create:belt_connector' })
    event.shaped('create:belt_connector', [
        'AAA',
        'AAA'
    ], {
        A: 'foand:bamboo_string'
    })
    // 脚手架
    event.shaped({ item: 'minecraft:scaffolding', count: 6 }, [
        'ABA',
        'A A',
        'A A'
    ], {
        A: 'minecraft:bamboo',
        B: 'foand:bamboo_string'
    })
    // 望远镜
    event.remove({ output: 'minecraft:spyglass' })
    event.shaped('minecraft:spyglass', [
        ' A ',
        ' B ',
        ' B '
    ], {
        A: 'minecraft:glass',
        B: 'minecraft:copper_ingot'
    })

    /*------------------ 方块压缩 -------------------*/
    event.recipes.anvilcraft.block_compress({
        "inputs": [
            { "blocks": "anvilcraft:sugar_block" },
            { "blocks": "minecraft:andesite" }
        ],
        "result": { "block": "foand:andesite_sugar_block" }
    }) //糖块 + 安山岩 -> 安山糖块

    /*------------------ 物品粉碎-------------------*/
    event.recipes.anvilcraft.item_crush(
        {
            "ingredients": [
                { "items": "foand:andesite_sugar_block" }
            ],
            "results": [
                { "count": 4, "id": "foand:andesite_sugar" }
            ]
        }
    )  // 安山糖块 -> 安山糖x4

    // 物品注入（item + block -> result）
    event.recipes.anvilcraft.item_inject({
        "block_ingredient": { "blocks": "minecraft:andesite" },
        "block_result": { "block": "foand:andesite_sugar_block" },
        "ingredients": [{ "items": "anvilcraft:sugar_block" }]
    }) //安山岩 + 糖块 -> 安山糖块

    /*------------------- 物品压缩-------------------*/
    event.recipes.anvilcraft.item_compress({
        "ingredients": [
            { 'items': 'foand:andesite_sugar' },
            { 'items': 'foand:poppy_melon_juice' },
        ],
        "results": [
            { "count": 1, "id": 'create:andesite_alloy' }
        ]
    }) // 安山糖块x2 + 罂粟西瓜汁x2 -> 安山合金

    /*------------------- 膨发----------------------*/
    event.recipes.anvilcraft.bulging({
        "fluid": "minecraft:water",
        "ingredients": [
            {
                "items": "minecraft:redstone"
            }
        ],
        "results": [
            {
                "id": "minecraft:sugar"
            }
        ]
    })// 红石 + 水 -> 糖

    /*-------------------------- 熔炉 --------------------------*/
    // 罂粟 —> 铁粒
    event.smelting('minecraft:iron_nugget',
        'minecraft:poppy').xp(0.1).cookingTime(50)
    // 罂粟西瓜片 -> 铁粒

    event.smelting('minecraft:iron_nugget',
        'foand:poppy_melon_slice').xp(0.1).cookingTime(50)
    // 木炭 -> 竹块
    event.smelting('minecraft:charcoal',
        'minecraft:bamboo_block').xp(0.1)
    // 木炭 -> 剥皮竹块 
    event.smelting('minecraft:charcoal',
        'minecraft:stripped_bamboo_block').xp(0.1)

    /*-------------------------- 物品拆分 --------------------------*/
    // 9糖 -> 糖块
    event.shapeless('anvilcraft:sugar_block', '9x minecraft:sugar')
    // 9片切片 -> 西瓜
    event.shapeless('foand:poppy_melon', '9x foand:poppy_melon_slice')

    /*---------------------------- 解包 ---------------------------*/
    // 罂粟西瓜 -> 罂粟西瓜片x9
    event.recipes.anvilcraft.unpack(
        {
            "ingredients": [
                { "items": 'foand:poppy_melon' }
            ],
            "results": [
                { "count": 9, "id": "foand:poppy_melon_slice" }
            ]
        }
    )

    /*---------------------------- 方块粉碎 ---------------------------*/
    // 西瓜 -> 西瓜沙
    event.recipes.anvilcraft.block_crush(
        {
            "input": { "blocks": "foand:poppy_melon" },
            "result": { "block": "foand:poppy_melon_sand" }
        }
    )

    /*--------------------------- 筛！！ ---------------------------*/
    // 西瓜沙 -> 原铁碎&红石
    event.recipes.anvilcraft.mesh(
        {
            "ingredients": [
                { "items": "foand:poppy_melon_sand" }
            ],
            "results": [{
                "count": {
                    "type": "minecraft:binomial",
                    "n": 4.0,
                    "p": 0.8
                },
                "id": "create:crushed_raw_iron"
            }, {
                "count": {
                    "type": "minecraft:binomial",
                    "n": 4.0,
                    "p": 0.8
                },
                "id": "minecraft:redstone"
            }
            ]
        }
    )
    // 沙子 -> 甘蔗（概率）
    event.recipes.anvilcraft.mesh({
        "ingredients": [
            { "items": "minecraft:sand" }
        ],
        "results": [{
            "count": {
                "type": "minecraft:binomial",
                "n": 1.0,
                "p": 0.25
            },
            "id": "minecraft:sugar_cane"
        }
        ]
    })
    // 沙砾 -> 西瓜种子&南瓜种子
    event.recipes.anvilcraft.mesh({
        "ingredients": [
            { "items": "minecraft:coarse_dirt" }
        ],
        "results": [{
            "count": {
                "type": "minecraft:binomial",
                "n": 1.0,
                "p": 0.25
            },
            "id": "minecraft:melon_seeds"
        },
        {
            "count": {
                "type": "minecraft:binomial",
                "n": 1.0,
                "p": 0.25
            },
            "id": "minecraft:pumpkin_seeds"
        }
        ]
    })

    /*------------------------------- 压缩加工 -------------------------------*/
    // 西瓜沙x1 + 玻璃瓶 -> 西瓜汁x1
    event.recipes.anvilcraft.item_compress(
        {
            "ingredients": [
                { "items": "foand:poppy_melon_sand" },
                { "items": "minecraft:glass_bottle" }
            ],
            "results": [
                { "id": "foand:poppy_melon_juice" }
            ]
        }
    )
    // 西瓜沙x2 + 玻璃瓶 -> 西瓜汁x2
    event.recipes.anvilcraft.item_compress(
        {
            "ingredients": [
                { "items": "foand:poppy_melon_sand" },
                { "count": 2, "items": "minecraft:glass_bottle" }
            ],
            "results": [
                { "count": 2, "id": "foand:poppy_melon_juice" }
            ]
        }
    )
    // 西瓜沙x3 + 玻璃瓶 -> 西瓜汁x3
    event.recipes.anvilcraft.item_compress(
        {
            "ingredients": [
                { "items": "foand:poppy_melon_sand" },
                { "count": 3, "items": "minecraft:glass_bottle" }
            ],
            "results": [
                { "count": 3, "id": "foand:poppy_melon_juice" }
            ]
        }
    )
    /*---------------------- 工作台 --------------------*/
    // 蟹笼
    event.shaped('anvilcraft:crab_trap', [
        'BAB',
        'A A',
        'BAB'
    ], {
        A: 'foand:bamboo_string',
        B: 'minecraft:stick'
    })
    /*---------------------- 搅拌 ----------------------*/
    event.recipes.create.mixing([
        'anvilcraft:crab_trap',
        { id: 'anvilcraft:crab_claw', chance: 0.2 },
        { id: 'minecraft:seagrass', chance: 0.3 },
        { id: 'minecraft:kelp', chance: 0.1 }
    ], [Fluid.water(1000), 'anvilcraft:crab_trap'])

    /*--------------------- 物品粉碎 ---------------------*/
    //蟹钳 -> 粉碎铜
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
    })
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
    /*---------------------------- create 手持点击 ------------------------*/
    // 铁块+铁锭->铁砧
    event.remove({ output: 'anvil' })
    event.remove({ output: 'chipped_anvil' })
    event.remove({ output: 'damaged_anvil' })
    event.recipes.create.item_application('minecraft:chipped_anvil',
        ['minecraft:iron_block', 'minecraft:iron_ingot'])
    /* -------------------------- create 流体 --------------------------*/
    // 西瓜汁装瓶
    event.recipes.create.filling('foand:poppy_melon_juice',
        [Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle'])
    // 倒出西瓜汁
    event.recipes.create.emptying([Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle'],
        'foand:poppy_melon_juice')

})