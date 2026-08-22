// 破坏虞美人西瓜时，相邻的弯苗恢复为直苗
// （对应 Kotlin 版 AttachedStemBlock 失去西瓜后的表现）
const POPPY_DIRECTIONS = {
    'north': [0, 0, -1],
    'south': [0, 0, 1],
    'west': [-1, 0, 0],
    'east': [1, 0, 0]
}

BlockEvents.broken(event => {
    if (event.block.id != 'foand:poppy_melon') return

    const pos = event.block.pos
    const level = event.level

    for (const key in POPPY_DIRECTIONS) {
        const offset = POPPY_DIRECTIONS[key]
        const neighbor = level.getBlock(pos.offset(offset[0], offset[1], offset[2]))
        if (neighbor.id == 'foand:attached_poppy_melon_stem') {
            level.getBlock(neighbor.pos).set('foand:poppy_melon_stem')
        }
    }
})
