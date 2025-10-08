Ponder.registry((event) => {
    event.create('minecraft:lightning_rod')
        .scene("lightning_test", "避雷针测试", (scene, util) => {
            // 初始化一个可见平台（显示基础方块）
            scene.showBasePlate();
            scene.idle(10);

            // 将避雷针放在场景中心 (通常中心是 [2,1,2])
            const pos = [2, 1, 2];
            scene.world.setBlock(pos, "minecraft:lightning_rod", false);
            scene.idle(5);

            // 强制显示这个方块（某些版本需要这句才能渲染方块）
            scene.showStructure();
            scene.world.showSection(pos, Facing.UP);

            // 高亮方块 + 提示文字
            scene.overlay.showText(60)
                .text("这是一个避雷针测试")
                .pointAt([2.5, 2, 2.5])
                .placeNearTarget();

            // 旋转摄像机展示
            scene.idle(30);
            scene.rotateCameraY(90);
            scene.idle(30);
            scene.rotateCameraY(90);
            scene.idle(30);
        });
});
