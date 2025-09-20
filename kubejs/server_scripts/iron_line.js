ServerEvents.recipes(event => {
    global.createRecipes.init(event)

    event.smelting('minecraft:iron_nugget', 'minecraft:poppy').xp(0.1);
    event.smelting('minecraft:iron_nugget', 'foand:poppy_melon_slice').xp(0.1);

    event.shapeless('foand:poppy_melon', '9x foand:poppy_melon_slice');
    event.recipes.anvilcraft.unpack('foand:poppy_melon', ChanceItemStack.of('9x foand:poppy_melon_slice'));

    event.recipes.anvilcraft.block_crush('foand:poppy_melon', 'foand:poppy_melon_sand');

    event.recipes.anvilcraft.mesh('foand:poppy_melon_sand', 'create:crushed_raw_iron', 1);

    event.recipes.anvilcraft.item_compress(['foand:poppy_melon_sand', 'minecraft:glass_bottle'], [ChanceItemStack.of('foand:poppy_melon_juice')]);
    event.recipes.anvilcraft.item_compress(
        ['foand:poppy_melon_sand', 'minecraft:glass_bottle', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('2x foand:poppy_melon_juice')]
    );
    event.recipes.anvilcraft.item_compress(
        ['foand:poppy_melon_sand', 'minecraft:glass_bottle', 'minecraft:glass_bottle', 'minecraft:glass_bottle'],
        [ChanceItemStack.of('3x foand:poppy_melon_juice')]
    );

    event.recipes.create.filling('foand:poppy_melon_juice', [Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle'])
    event.recipes.create.emptying([Fluid.of('foand:poppy_melon_juice', 250), 'minecraft:glass_bottle'], 'foand:poppy_melon_juice')

});

BlockEvents.rightClicked((event) => {
    const { level, item, block, player } = event;

    if (block.id != 'foand:poppy_melon') return; // 确保右键点击的是目标方块
    if (!item.is('minecraft:shears')) return; // TODO 将剪刀改为小刀


    const itemEntity = level.createEntity('item');
    const dropCount = 1 + Math.floor(Math.random() * 2);
    itemEntity.item = Item.of('poppy', dropCount); // 设置掉落物为虞美人，数量为dropCount
    itemEntity.setPosition(block.x + 0.5, block.y + 0.5, block.z + 0.5);//掉落物偏移
    itemEntity.spawn(); // 生成掉落物实体到世界

    level.getBlock(block.pos).set('minecraft:melon');

    level.runCommandSilent("playsound minecraft:entity.sheep.shear");// 播放剪刀使用音效
    player.swing();// 播放玩家挥动手臂的动画
    item.damageValue += 1// 消耗剪刀耐久

});

//副手拿剪刀主手拿罂粟，将西瓜苗变为罂粟西瓜苗
BlockEvents.rightClicked((event) => {
    const { level, item, block, player } = event;
    // 确保右键点击的是目标方块
    if (block.id != 'minecraft:melon_stem'
        && block.id != 'minecraft:melon_attached_stem'
    ) return;
    if (!item.is('minecraft:shears')) return; // TODO 将剪刀改为小刀

    const mainhand = player.offHandItem;
    if (!mainhand.is('minecraft:poppy')) return; // 确保主手拿着罂粟

    level.getBlock(block.pos).set('foand:poppy_melon_stem');

    level.runCommandSilent("playsound minecraft:entity.sheep.shear");// 播放剪刀使用音效
    player.swing();// 播放玩家挥动手臂的动画
    item.damageValue += 1// 消耗剪刀耐久
    if (!player.isCreative()) {
        mainhand.count -= 1;// 消耗主手罂粟
    }

});

//拿剪刀将罂粟西瓜苗变为西瓜苗
BlockEvents.rightClicked((event) => {
    const { level, item, block, player } = event;
    // 确保右键点击的是目标方块
    if (block.id != 'foand:poppy_melon_stem'
        && block.id != 'foand:poppy_melon_attached_stem'
    ) return;
    if (!item.is('minecraft:shears')) return; // TODO 将剪刀改为小刀

    level.getBlock(block.pos).set('minecraft:melon_stem');//TODO 西瓜苗age无法设置
    level.runCommandSilent("playsound minecraft:entity.sheep.shear");// 播放剪刀使用音效
    player.swing();// 播放玩家挥动手臂的动画
    item.damageValue += 1// 消耗剪刀耐久
    if (!player.isCreative()) {
        player.giveItem(Item.of('minecraft:poppy'));// 给予玩家罂粟
    }

});
