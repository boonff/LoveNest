Ponder.registry((event) => {
    event.create('minecraft:lightning_rod')
        .scene("lightning_test", "避雷针测试", (scene, util) => {

            // 显示基础平台
            scene.showBasePlate();
            scene.idle(10);

            // 放置避雷针
            const rodPos = [2, 1, 2];
            scene.world.setBlock(rodPos, "minecraft:lightning_rod", false);
            scene.world.showSection(rodPos, Facing.UP);
            scene.idle(10);

            // 放置铁砧在避雷针上方
            const anvilPos = [2, 4, 2];
            scene.world.setBlock(anvilPos, "minecraft:anvil", false);
            scene.world.showSection(anvilPos, Facing.DOWN);
            scene.overlay.showText(40)
                .text("铁砧即将落下")
                .pointAt([2.5, 4, 2.5])
                .placeNearTarget();
            scene.idle(30);

            // 模拟铁砧下落动画
            for (let y = 4; y >= 2; y--) {
                const oldPos = [2, y, 2];
                const newPos = [2, y - 1, 2];
                scene.world.setBlock(oldPos, "minecraft:air", false);
                scene.world.setBlock(newPos, "minecraft:anvil", false);
                scene.world.showSection(newPos, Facing.UP);
                scene.idle(5);
            }

            // 播放闪电动画
            scene.idle(10);
            scene.world.createEntity("minecraft:lightning_bolt", [2.5, 2.5, 2.5]);
            scene.overlay.showText(50)
                .text("雷电被避雷针引导！⚡")
                .pointAt([2.5, 2, 2.5])
                .placeNearTarget();

            // 摄像机旋转展示
            scene.idle(30);
            scene.rotateCameraY(90);
            scene.idle(30);
            scene.rotateCameraY(90);
            scene.idle(30);
        });
});
