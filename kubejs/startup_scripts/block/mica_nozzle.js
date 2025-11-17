
StartupEvents.registry('block', event => {
    event.create('foand:mica_nozzle')
        .hardness(2)
        .resistance(10)
        .box(1, 0, 1, 15, 14, 15)
})

StartupEvents.registry('block', event => {
    event.create('foand:mica_nozzle_lit')
        .hardness(2)
        .resistance(10)
        .box(1, 0, 1, 15, 14, 15)
        .lightLevel(0.2)
        .noItem()
        .randomTick(event => {
            let pos = event.block.pos
            let level = event.level
            const upPos = pos.offset(0, 1, 0)
            const downPos = pos.offset(0, -1, 0)

            if (level.getBlock(upPos).id == 'minecraft:air') {
                const count = countMicaNozzle(level, getDownPositions(pos))
                genQuartzCluster(level, upPos, "up", count)
            } else if (level.getBlock(downPos).id == 'minecraft:air') {
                const count = countMicaNozzle(level, getUpPositions(pos))
                genQuartzCluster(level, downPos, "down", count)
            }
        })
})

// 生成规则：纵向连接的云母收集器数量越多，生成云母簇的概率越大（上限5）
function genQuartzCluster(level, pos, facing, count) {
    if (getRandom(count))
        level.getBlock(pos).set('foand:quartz_cluster', { facing: facing })
}

function getRandom(count) {
    return (0.1 * ((count + 1) / 5)) > Math.random()
}

function countMicaNozzle(level, posList) {
    let count = 0
    posList.forEach(pos => {
        const block = level.getBlock(pos.x, pos.y, pos.z)
        if (block.id == 'foand:mica_nozzle_lit') count += 1
    })
    return count
}

function getUpPositions(pos) {
    const list = []
    for (let i = 1; i <= 4; i++) {
        list.push({
            x: pos.x,
            y: pos.y + i,
            z: pos.z
        })
    }
    return list
}

function getDownPositions(pos) {
    const list = []
    for (let i = 1; i <= 4; i++) {
        list.push({
            x: pos.x,
            y: pos.y - i,
            z: pos.z
        })
    }
    return list
}

