ServerEvents.recipes(event => {
    // 初始化全局配方
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)

    // 熔炉配方
    event.smelting('minecraft:iron_nugget',
        'minecraft:poppy').xp(0.1).cookingTime(50); // 罂粟 —> 铁粒

    event.smelting('minecraft:iron_nugget',
        'foand:poppy_melon_slice').xp(0.1).cookingTime(50); // 罂粟西瓜片 -> 铁粒

    event.smelting('minecraft:charcoal',
        'minecraft:bamboo_block').xp(0.1); // 木炭 -> 竹块

    event.smelting('minecraft:charcoal',
        'minecraft:stripped_bamboo_block').xp(0.1); // 木炭 -> 剥皮竹块 

    // 物品拆分
    event.shapeless('anvilcraft:sugar_block', '9x minecraft:sugar'); // 9糖 -> 糖块
    event.shapeless('foand:poppy_melon', '9x foand:poppy_melon_slice'); // 9片切片 -> 西瓜

    // 解包
    event.recipes.anvilcraft.unpack(
        {
            "ingredients": [
                { "items": 'foand:poppy_melon' }
            ],
            "results": [
                { "count": 9, "id": "foand:poppy_melon_slice" }
            ]
        }
    )// 罂粟西瓜 -> 罂粟西瓜片x9

    // 方块粉碎
    event.recipes.anvilcraft.block_crush(
        {
            "input": { "blocks": "foand:poppy_melon" },
            "result": { "block": "foand:poppy_melon_sand" }
        }
    ); // 西瓜 -> 西瓜沙

    // 筛！！
    event.recipes.anvilcraft.mesh(
        {
            "ingredients": [
                { "items": "foand:poppy_melon_sand" }
            ],
            "results": [{
                "count": {
                    "type": "minecraft:binomial",
                    "n": 3.0,
                    "p": 0.8
                },
                "id": "create:crushed_raw_iron"
            }, {
                "count": {
                    "type": "minecraft:binomial",
                    "n": 3.0,
                    "p": 0.6
                },
                "id": "minecraft:redstone"
            }
            ]
        }
    ); // 西瓜沙 -> 原铁碎&红石
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
    }
    ) // 沙子 -> 甘蔗（概率）
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
    }) // 沙砾 -> 西瓜种子&南瓜种子

    // 压缩加工
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
    ); // 西瓜沙x1 + 玻璃瓶 -> 西瓜汁x1
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
    ); // 西瓜沙x2 + 玻璃瓶 -> 西瓜汁x2
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
    ); // 西瓜沙x3 + 玻璃瓶 -> 西瓜汁x3

    // Create 模组液体操作
    event.recipes.create.filling('foand:poppy_melon_juice', [Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle']); // 装瓶西瓜汁
    event.recipes.create.emptying([Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle'], 'foand:poppy_melon_juice'); // 倒空西瓜汁瓶

    // 高效配方
    event.recipes.create.mixing('minecraft:iron_block', [Fluid.of('foand:poppy_melon_juice', 1000), Fluid.lava(1000)]); // 1000mb瓜汁 + 1000mb岩浆 -> 1铁块
});