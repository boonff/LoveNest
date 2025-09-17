
const directions = {
    'north': [0, 0, -1],
    'south': [0, 0, 1],
    'west': [-1, 0, 0],
    'east': [1, 0, 0]
};
// 处理罂粟西瓜方块被破坏时，更新相邻的罂粟西瓜苗状态
BlockEvents.broken(event => {
    const pos = event.block.pos;
    const level = event.level;

    if (event.block.id == 'kubejs:poppy_melon') {
        console.log("罂粟西瓜被破坏")

        for (const key in directions) {
            let offset = directions[key];
            let neighborPos = pos.offset(offset[0], offset[1], offset[2]);
            let neighborBlock = level.getBlock(neighborPos);
            console.log(`neighborPos: ${neighborPos}`);
            console.log(`neighborBlock: ${neighborBlock}`);
            if (neighborBlock.id == 'kubejs:poppy_attached_melon_stem') {
                console.log("更新罂粟西瓜苗为直立状态")
                level.getBlock(neighborPos).set('kubejs:poppy_melon_stem');
            }
        }
    }
});