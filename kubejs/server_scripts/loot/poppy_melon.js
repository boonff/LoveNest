
// 虞美人西瓜的精准采集掉落
// 普通掉落（3~9 片）由 startup_scripts/block/poppy_melon.js 的 .drops() 定义
// 这里仅处理精准采集：移除片，改掉西瓜本体

BlockEvents.drops(event => {
    if (event.block.id != 'foand:poppy_melon') return

    const tool = event.tool
    if (tool && tool.hasEnchantment('minecraft:silk_touch')) {
        event.removeItem('foand:poppy_melon_slice') // 移除虞美人西瓜片
        event.addItem(Item.of('foand:poppy_melon')) // 掉落西瓜本体
    }
})
