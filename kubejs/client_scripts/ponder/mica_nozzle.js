Ponder.registry(event => {
    event.create("foand:mica_nozzle")
        .scene("mica_nozzle", "", (scene, util) => {
            scene.showBasePlate() 

            scene.world.setBlock(RodPos, "minecraft:lightning_rod", false)
            scene.world.showSection(RodPos, Facing.UP) 

            scene.idle(20)
            scene.rotateCameraY(45)  // 左右旋转

            scene.idle(20)
            scene.sceneOffsetY(50)
            scene.idle(20)
            scene.scaleSceneView(0.5)  // 拉远
        })
})

