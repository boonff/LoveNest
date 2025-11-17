ServerEvents.recipes(event => {
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)

    // 方块压缩
    event.recipes.anvilcraft.block_compress({
        "inputs": [
            { "blocks": "anvilcraft:sugar_block" },
            { "blocks": "minecraft:andesite" }
        ],
        "result": { "block": "foand:andesite_sugar_block" }
    }) //糖块 + 安山岩 -> 安山糖块

    // 物品粉碎
    event.recipes.anvilcraft.item_crush(
        {
            "ingredients": [
                { "items": "foand:andesite_sugar_block" }
            ],
            "results": [
                { "count": 4, "id": "foand:andesite_sugar" }
            ]
        }
    ); // 安山糖块 -> 安山糖x4

    // 物品注入（item + block -> result）
    event.recipes.anvilcraft.item_inject({
        "block_ingredient": { "blocks": "minecraft:andesite" },
        "block_result": { "block": "foand:andesite_sugar_block" },
        "ingredients": [{ "items": "anvilcraft:sugar_block" }]
    }) //安山岩 + 糖块 -> 安山糖块

    // 物品压缩
    event.recipes.anvilcraft.item_compress({
        "ingredients": [
            { 'items': 'foand:andesite_sugar' },
            { 'items': 'foand:poppy_melon_juice' },
        ],
        "results": [
            { "count": 1, "id": 'create:andesite_alloy' }
        ]
    }) // 安山糖块x2 + 罂粟西瓜汁x2 -> 安山合金

    // 膨发
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
    })

    event.recipes.create.deploying('foand:andesite_sugar_block',
        ['minecraft:andesite', 'anvilcraft:sugar_block']) //糖块 + 安山岩 -> 安山糖块

    event.recipes.create.mixing('create:andesite_alloy',
        [Fluid.of('foand:poppy_melon_juice', 50), 'foand:andesite_sugar'])
})