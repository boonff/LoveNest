ServerEvents.recipes(event => {
    event.smelting('minecraft:iron_nugget', 'minecraft:poppy').xp(0.1).cookingTime(200);

    event.recipes.anvilcraft.block_crush('kubejs:poppy_melon','kubejs:poppy_melon_sand');
});