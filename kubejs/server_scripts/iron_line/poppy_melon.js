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
    });

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
