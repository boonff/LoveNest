
// 虞美人西瓜的精准采集掉落
// 普通掉落（3~9 片）由 startup_scripts/block/poppy_melon.js 的 .drops() 定义
// 这里仅处理精准采集：移除片，改掉西瓜本体

BlockEvents.drops(event => {
    if (event.block.id != 'foand:poppy_melon') return

    const tool = event.tool
    // KubeJS 7.2（1.21.1）：hasEnchantment(Holder<Enchantment>, level)，第一个参数传附魔 ID 字符串会自动转换，第二个参数是最低等级
    if (tool && tool.hasEnchantment('minecraft:silk_touch', 1)) {
        event.removeItem('foand:poppy_melon_slice') // 移除虞美人西瓜片
        event.addItem(Item.of('foand:poppy_melon')) // 掉落西瓜本体
    }
})
