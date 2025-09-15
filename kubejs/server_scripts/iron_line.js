ServerEvents.recipes(event => {
    event.smelting('minecraft:iron_nugget', 'minecraft:poppy').xp(0.1).cookingTime(200);

    event.recipes.anvilcraft.block_crush('kubejs:poppy_melon','kubejs:poppy_melon_sand');
    
    event.recipes.anvilcraft.item_compress(['kubejs:poppy_melon_sand', 'minecraft:glass_bottle'], 'kebujs:poppy_melon_juice');
    event.recipes.anvilcraft.item_compress(['kubejs:poppy_melon_sand', '2x minecraft:glass_bottle'], '2x kebujs:poppy_melon_juice');
    event.recipes.anvilcraft.item_compress(['kubejs:poppy_melon_sand', '3x minecraft:glass_bottle'], '3x kebujs:poppy_melon_juice');

});