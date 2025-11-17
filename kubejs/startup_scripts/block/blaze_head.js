StartupEvents.registry('block', event => {
    // 烈焰人头
    event.create('foand:blaze_head')
        .opaque(false)
        .lightLevel(1)
        .hardness(1.5) // 设置硬度
        .resistance(1.0) // 设置爆炸抗性
        .soundType('wood')
        .notSolid()
        .box(0.25, 0.0, 0.25, 0.75, 0.5, 0.75, false)
        .property(BlockProperties.HORIZONTAL_FACING)
        .placementState((callback) => {
            callback.set(BlockProperties.HORIZONTAL_FACING, callback.horizontalDirection.opposite)
        })
}) 
