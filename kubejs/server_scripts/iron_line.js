ServerEvents.recipes(event => {
    event.smelting('minecraft:iron_nugget', 'minecraft:poppy').xp(0.1).cookingTime(200);
    event.smelting('kubejs:poppy_melon_slice', 'minecraft:poppy').xp(0.1);


    event.recipes.anvilcraft.block_crush('kubejs:poppy_melon', 'kubejs:poppy_melon_sand');

    event.recipes.anvilcraft.mesh('kubejs:poppy_melon_sand', 'create:crushed_raw_iron', 1);

    event.recipes.anvilcraft.item_compress(['kubejs:poppy_melon_sand', 'minecraft:glass_bottle'], [ChanceItemStack.of('kubejs:poppy_melon_juice')]);
    event.recipes.anvilcraft.item_compress(
        ['kubejs:poppy_melon_sand', 'minecraft:glass_bottle', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('kubejs:poppy_melon_juice'), ChanceItemStack.of('kubejs:poppy_melon_juice')]
    );
    event.recipes.anvilcraft.item_compress(
        ['kubejs:poppy_melon_sand', 'minecraft:glass_bottle', 'minecraft:glass_bottle', 'minecraft:glass_bottle'],
        [
            ChanceItemStack.of('kubejs:poppy_melon_juice'),
            ChanceItemStack.of('kubejs:poppy_melon_juice'),
            ChanceItemStack.of('kubejs:poppy_melon_juice')
        ]
    );

});