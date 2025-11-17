StartupEvents.registry('block', event => {
    event.create('foand:quartz_cluster')
        .hardness(2)
        .resistance(10)
        .box(1, 0, 1, 15, 14, 15)
        .property(BlockProperties.FACING)
        .placementState((callback) => {
            console.log("quartz_cluster朝向：", callback.horizontalDirection.opposite)
            callback.set(BlockProperties.FACING, callback.nearestLookingDirection.opposite)
        })
})
