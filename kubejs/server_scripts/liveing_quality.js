//将竹子合成竹板
ServerEvents.recipes(event => {
    event.shaped('minecraft:bamboo_planks', [
        'BB',
        'BB'
    ], {
        B: 'minecraft:bamboo'
    })
})

//修改原版竹块的配方
ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:bamboo_block' })
    event.shaped('minecraft:bamboo_block', [
        'BBB',
        'B B',
        'BBB'
    ], {
        B: 'minecraft:bamboo'
    })
})

// 添加竹子到堆肥桶
ServerEvents.recipes(event => {
    event.custom({
        "type": "minecraft:composting",
        "ingredient": {
            "item": "minecraft:bamboo"
        },
        "chance": 0.65
    })
})

// 添加精准采集掉落
LootJS.modifiers((event) => {
    let block_list = [
        'kubejs:poppy_melon'
    ]
    block_list.forEach(block => {

        event.addBlockModifier(block)
            .matchTool(ItemFilter.hasEnchantment("minecraft:silk_touch"))
            .removeLoot(Ingredient.all)
            .addLoot(block)
    });

});
