
// 添加精准采集掉落
LootJS.modifiers((event) => {
    event.addBlockModifier('foand:poppy_melon')
        .addAlternativesLoot(
            LootEntry.of('foand:poppy_melon'
            ).when(c =>
                c.matchMainHand(ItemFilter.hasEnchantment("minecraft:silk_touch"))
            ),
            LootEntry.of("foand:poppy_melon_slice", { type: 'minecraft:uniform', min: 3, max: 7 })
        )

    let block_list = []
    block_list.forEach(block => {

        event.addBlockModifier(block)
            .matchTool(ItemFilter.hasEnchantment("minecraft:silk_touch"))
            .removeLoot(Ingredient.all)
            .addLoot(block)
    }) 

}) 
