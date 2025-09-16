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

BlockEvents.rightClicked((event) => { // 监听右键点击方块事件
    const { level, hand, item, block, entity } = event;
    const player = entity; // 将触发事件的实体视为玩家

    // 检查是否为目标方块、主手操作、且手持物品为剪刀
    if (block.id != 'kubejs:poppy_melon') return; // 确保右键点击的是目标方块
    if (!item.is('minecraft:shears')) return; // 检查手持物品是否为剪刀


    // 生成1-2个虞美人的随机掉落数量
    const dropCount = 1 + Math.floor(Math.random() * 2); // 随机1或2
    // 创建掉落物实体
    const itemEntity = level.createEntity('item');
    itemEntity.item = Item.of('poppy', dropCount); // 设置掉落物为虞美人，数量为dropCount
    // 设置掉落物位置为方块位置加上中心偏移，并稍微上方以避免卡在方块内
    itemEntity.setPosition(block.x + 0.5, block.y + 0.5, block.z + 0.5);
    itemEntity.spawn(); // 生成掉落物实体到世界

    // 将方块变为西瓜方块 (minecraft:melon)
    level.getBlock(block.pos).set('minecraft:melon'); // 使用MC原版西瓜的ID

    // 播放剪刀使用音效
    level.runCommandSilent("playsound minecraft:entity.sheep.shear");

    // 消耗剪刀耐久
    item.hurt(1, player); // 对剪刀造成1点耐久消耗

});