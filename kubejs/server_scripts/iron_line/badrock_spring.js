BlockEvents.broken(event => {
    if (event.block.id == 'foand:melt_gem_block') {
        console.log("触发熔炼宝石方块破坏事件")
        let pos = event.block.pos
        let level = event.level
        // 延迟一 tick 避免和原生破坏冲突
        level.server.scheduleInTicks(1, () => {
            level.getBlock(pos).set('anvilcraft:melt_gem') // 这里直接用字符串 ID 就行
        })
    }
})
