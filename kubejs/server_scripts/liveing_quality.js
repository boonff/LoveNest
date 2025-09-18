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


// 添加精准采集掉落
LootJS.modifiers((event) => {

    // 添加虞美人西瓜掉落
    event.addBlockModifier('foand:poppy_melon')
        .addAlternativesLoot(
            LootEntry.of('minecraft:grass_block'
            ).when(c =>
                c.matchMainHand(ItemFilter.hasEnchantment("minecraft:silk_touch"))
            ),
            LootEntry.of("foand:poppy_melon_slice", { type: 'minecraft:uniform', min: 3, max: 7 })
        )

    // 其他需设置的精准caiji
    let block_list = []
    block_list.forEach(block => {

        event.addBlockModifier(block)
            .matchTool(ItemFilter.hasEnchantment("minecraft:silk_touch"))
            .removeLoot(Ingredient.all)
            .addLoot(block)
    });

});