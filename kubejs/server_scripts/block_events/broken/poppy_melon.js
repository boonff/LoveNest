// 下方方块被破坏时，上方的西瓜秧立即掉落（掉 1 粒西瓜种子）
// randomTick 检查耕地有延迟，这里提供即时响应
BlockEvents.broken(event => {
    const above = event.level.getBlock(event.block.pos.offset(0, 1, 0))
    if (above.id == 'foand:poppy_melon_stem' || above.id == 'foand:attached_poppy_melon_stem') {
        event.level.destroyBlock(above.pos, true)
    }
})
