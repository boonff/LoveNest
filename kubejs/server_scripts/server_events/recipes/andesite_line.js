ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    // 方块压缩
    event.custom({
        "type": "anvilcraft:block_compress",
        "inputs": [
            {
                "blocks": "anvilcraft:sugar_block"
            },
            {
                "blocks": "minecraft:andesite"
            }
        ],
        "result": {
            "block": "foand:andesite_sugar_block"
        }
    }) //糖块 + 安山岩 -> 安山糖块

    // 物品注入（item + block -> result）
    event.custom({
        "type": "anvilcraft:item_compress",
        "ingredients": [
            { "items": "minecraft:andesite" },
            { "items": "minecraft:sugar_block" }
        ],
        "results": [
            { "id": "foand:andesite_sugar_block" }
        ]
    }) //安山岩 + 糖块 -> 安山糖块

    // 物品压缩
    event.custom({
        "type": "anvilcraft:item_compress",
        "ingredients": [
            { 'count': 2, 'items': 'foand:andesite_sugar_block' },
            { 'count': 2, 'items': 'foand:poppy_melon_juice' },
        ],
        "results": [
            { "count": 1, "id": 'create:andesite_alloy' }
        ]

    }
    ) // 安山糖块x2 + 罂粟西瓜汁x2 -> 鞍山合金

    event.recipes.create.deploying('foand:andesite_sugar_block', ['anvilcraft:sugar_block', 'minecraft:andesite'])

    event.recipes.create.mixing('9x create:andesite_alloy', [Fluid.of('foand:poppy_melon_juice', 100), 'foand:andesite_sugar_block']).heated()
    // event.custom().merge
})