ServerEvents.recipes(event => {
    // 初始化全局配方
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)
    // 竹子相关
    event.shaped('minecraft:bamboo_planks', [
        'AA',
        'AA'
    ], {
        A: 'minecraft:bamboo'
    })

    event.remove({ output: 'minecraft:bamboo_block' })
    event.shaped('minecraft:bamboo_block', [
        'AAA',
        'A A',
        'AAA'
    ], {
        A: 'minecraft:bamboo'
    })

    event.shaped("foand:bamboo_string", ['A'], { A: 'minecraft:bamboo' })// 竹子 -> 竹线

    event.shaped({ item: 'minecraft:scaffolding', count: 6 }, [
        'ABA',
        'A A',
        'A A'
    ], {
        A: 'minecraft:bamboo',
        B: 'foand:bamboo_string'
    })  // 脚手架

    event.shaped('anvilcraft:crab_trap', [
        'BAB',
        'A A',
        'BAB'
    ], {
        A: 'foand:bamboo_string',
        B: 'minecraft:stick'
    }) // 蟹笼

    event.shaped('woodenbucket:wooden_bucket', [
        'A A',
        ' A ',
    ], {
        A: 'minecraft:bamboo_block'
    }) // 木桶

    event.remove({ output: 'minecraft:spyglass' }) // 移除望远镜原版配方
    event.shaped('minecraft:spyglass', [
        ' A ',
        ' B ',
        ' B '
    ], {
        A: 'minecraft:glass',
        B: 'minecraft:copper_ingot'
    }) // 望远镜

    event.remove({ output: 'minecraft:ladder' })

    // 熔炉配方
    event.smelting('minecraft:iron_nugget', 'minecraft:poppy').xp(0.1).cookingTime(50); // 罂粟 —> 铁粒
    event.smelting('minecraft:iron_nugget', 'foand:poppy_melon_slice').xp(0.1); // 罂粟西瓜片 -> 铁粒
    event.smelting('minecraft:charcoal', 'minecraft:bamboo_block').xp(0.1); // 木炭 -> 竹块
    event.smelting('minecraft:charcoal', 'minecraft:stripped_bamboo_block').xp(0.1); // 木炭 -> 剥皮竹块 

    // 物品拆分
    event.shapeless('anvilcraft:sugar_block', '9x minecraft:sugar'); // 9糖 -> 糖块
    event.shapeless('foand:poppy_melon', '9x foand:poppy_melon_slice'); // 9片切片 -> 西瓜

    // 解包
    event.recipes.anvilcraft.unpack(
        {
            "ingredients": [
                { "items": 'foand:poppy_melon' }
            ],
            "results": [
                { "count": 9, "id": "foand:poppy_melon_slice" }
            ]
        }
    )// 罂粟西瓜 -> 罂粟西瓜片x9
    // 物品粉碎
    event.recipes.anvilcraft.item_crush('foand:andesite_sugar_block', ChanceItemStack.of('9x foand:andesite_sugar')); // 安山糖块 -> 9安山糖

    // 方块粉碎
    event.recipes.anvilcraft.block_crush('foand:poppy_melon', 'foand:poppy_melon_sand'); // 西瓜 -> 西瓜沙

    // 筛！！
    event.recipes.anvilcraft.mesh('foand:poppy_melon_sand', 'create:crushed_raw_iron', 1); // 西瓜沙 -> 原铁碎
    event.recipes.anvilcraft.mesh('foand:poppy_melon_sand', 'minecraft:redstone', { "min": 1, "max": 5 }) // 西瓜沙 -> 红石
    event.recipes.anvilcraft.mesh('minecraft:sand', 'minecraft:sugar_cane', { type: 'minecraft:cbinomial', n: 1, p: 0.25 }) // 沙子 -> 甘蔗（概率）
    event.recipes.anvilcraft.mesh('minecraft:coarse_dirt', 'minecraft:melon_seeds', { type: 'minecraft:cbinomial', n: 1, p: 0.25 }) // 沙子 -> 西瓜种子（概率）
    event.recipes.anvilcraft.mesh('minecraft:coarse_dirt', 'minecraft:pumpkin_seeds', { type: 'minecraft:cbinomial', n: 1, p: 0.25 }) // 沙子 -> 南瓜种子（概率）


    // 压缩加工
    event.recipes.anvilcraft.item_compress(
        ['foand:poppy_melon_sand', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('foand:poppy_melon_juice')]
    ); // 西瓜沙 + 玻璃瓶 -> 西瓜汁
    event.recipes.anvilcraft.item_compress(
        ['foand:poppy_melon_sand', 'minecraft:glass_bottle', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('2x foand:poppy_melon_juice')]
    ); // 西瓜沙 + 2瓶玻璃瓶 -> 2x 西瓜汁
    event.recipes.anvilcraft.item_compress(
        ['foand:poppy_melon_sand', 'minecraft:glass_bottle', 'minecraft:glass_bottle', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('3x foand:poppy_melon_juice')]
    ); // 西瓜沙 + 3瓶玻璃瓶 -> 3x 西瓜汁

    // Create 模组液体操作
    event.recipes.create.filling('foand:poppy_melon_juice', [Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle']); // 装瓶西瓜汁
    event.recipes.create.emptying([Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle'], 'foand:poppy_melon_juice'); // 倒空西瓜汁瓶

    // 高效配方
    event.recipes.create.mixing('minecraft:iron_block', [Fluid.of('foand:poppy_melon_juice', 1000), Fluid.lava(1000)]); // 1000mb瓜汁 + 1000mb岩浆 -> 1铁块
});