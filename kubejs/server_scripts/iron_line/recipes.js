ServerEvents.recipes(event => {
    global.createRecipes.init(event); // 初始化全局配方
    // 竹子相关
    event.shaped('minecraft:bamboo_planks', [
        'BB',
        'BB'
    ], {
        B: 'minecraft:bamboo'
    })

    event.remove({ output: 'minecraft:bamboo_block' })
    event.shaped('minecraft:bamboo_block', [
        'BBB',
        'B B',
        'BBB'
    ], {
        B: 'minecraft:bamboo'
    })

    // 熔炉配方
    event.smelting('minecraft:iron_nugget', 'minecraft:poppy').xp(0.1).cookingTime(200); // 铁锭 → 罂粟
    event.smelting('foand:poppy_melon_slice', 'minecraft:poppy').xp(0.1); // 西瓜切片 → 罂粟
    event.smelting('minecraft:charcoal', 'minecraft:bamboo_block').xp(0.1); // 竹块 → 木炭
    event.smelting('minecraft:charcoal', 'minecraft:stripped_bamboo_block').xp(0.1); // 剥皮竹块 → 木炭

    // 零星加工
    event.shapeless('foand:poppy_melon', '9x foand:poppy_melon_slice'); // 9片切片 → 西瓜
    event.recipes.anvilcraft.unpack('foand:poppy_melon', ChanceItemStack.of('9x foand:poppy_melon_slice')); // 西瓜 → 9片切片

    // 粉碎加工
    event.recipes.anvilcraft.block_crush('foand:poppy_melon', 'foand:poppy_melon_sand'); // 西瓜 → 西瓜沙
    event.recipes.anvilcraft.mesh('foand:poppy_melon_sand', 'create:crushed_raw_iron', 1); // 西瓜沙 → 原铁碎

    // 压缩加工
    event.recipes.anvilcraft.item_compress(
        ['foand:poppy_melon_sand', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('foand:poppy_melon_juice')]
    ); // 西瓜沙 + 玻璃瓶 → 西瓜汁
    event.recipes.anvilcraft.item_compress(
        ['foand:poppy_melon_sand', 'minecraft:glass_bottle', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('2x foand:poppy_melon_juice')]
    ); // 西瓜沙 + 2瓶玻璃瓶 → 2x 西瓜汁
    event.recipes.anvilcraft.item_compress(
        ['foand:poppy_melon_sand', 'minecraft:glass_bottle', 'minecraft:glass_bottle', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('3x foand:poppy_melon_juice')]
    ); // 西瓜沙 + 3瓶玻璃瓶 → 3x 西瓜汁

    // Create 模组液体操作
    event.recipes.create.filling('foand:poppy_melon_juice', [Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle']); // 装瓶西瓜汁
    event.recipes.create.emptying([Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle'], 'foand:poppy_melon_juice'); // 倒空西瓜汁瓶
});
