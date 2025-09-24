ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    // 方块压缩
    event.recipes.anvilcraft.block_compress(['anvilcraft:sugar_block', 'minecraft:andesite'], 'foand:andesite_sugar_block')
    event.recipes.anvilcraft.item_inject('minecraft:andesite', 'anvilcraft:sugar_block', 'foand:andesite_sugar_block')

    // 物品压缩
    event.recipes.anvilcraft.item_compress(
        ['foand:andesite_sugar_block', 'foand:poppy_melon_juice', 'foand:andesite_sugar_block', 'foand:poppy_melon_juice'],
        [ChanceItemStack.of('create:andesite_alloy'), ChanceItemStack.of('2x minecraft:glass_bottle')]
    );

    event.recipes.create.deploying('foand:andesite_sugar_block', ['anvilcraft:sugar_block', 'minecraft:andesite'])

    event.recipes.create.mixing('9x create:andesite_alloy', [Fluid.of('foand:poppy_melon_juice', 100), 'foand:andesite_sugar_block'])

})