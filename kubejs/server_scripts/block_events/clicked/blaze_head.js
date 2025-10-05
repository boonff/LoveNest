BlockEvents.rightClicked((event) => {
    const { level, item, block, player } = event;

    console.log(block.properties);

    // 确保右键点击的是目标方块
    if (!(block.id == 'create:blaze_burner' && block.properties['blaze'] == 'none')) return;

    const mainhand = player.mainHandItem;
    if (!mainhand.is('foand:blaze_head')) return; // 确保主手拿着烈焰人头

    block.properties['blaze'] = 'smouldering'
    block.set('create:blaze_burner', {'blaze': 'smouldering'})

    level.runCommandSilent("playsound create:blaze_munch");// 播放音效
    player.swing();// 播放玩家挥动手臂的动画
    if (!player.isCreative()) {
        mainhand.count -= 1;// 消耗主手烈焰人头
    }
    event.cancel() // 阻止后续操作

});