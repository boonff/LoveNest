ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    event.recipes.anvilcraft.block_compress(['minecraft:andesite', 'anvilcraft:sugar_block'], 'foand:andesite_sugar_block')
    event.recipes.anvilcraft.item_inject('minecraft:andesite', 'anvilcraft:sugar_block', 'foand:andesite_sugar_block')
    event.recipes.create.deploying('foand:andesite_sugar_block', ['anvilcraft:sugar_block', 'minecraft:andesite'])

    event.recipes.anvilcraft.item_compress(
        ['foand:andesite_sugar_block', 'foand:poppy_melon_juice', 'foand:andesite_sugar_block', 'foand:poppy_melon_juice'],
        [ChanceItemStack.of('create:andesite_alloy'), ChanceItemStack.of('2x minecraft:glass_bottle')]
    );
})