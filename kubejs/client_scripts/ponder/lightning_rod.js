const CrossShape = [
    [2, 1, 2], // 中心
    [1, 1, 2], // 左
    [3, 1, 2], // 右
    [2, 1, 1], // 前
    [2, 1, 3]  // 后
]

const RodPos = [2, 2, 2]
const AnvilUp = [2, 5, 2]
const AnvilDown = [2, 3, 2]
const AnvilDownDown = [2, 2, 2]


function anvilDrop(scene, anvilId, anvilPos, anvilDownPos) {
    scene.world.setBlock(anvilDownPos, "minecraft:air", false)
    scene.world.showSection(anvilDownPos, Facing.UP) //取消前摇（
    scene.world.setBlock(anvilPos, "minecraft:air", false)

    const fallingAnvil = scene.world.createEntity(
        "minecraft:falling_block",
        [
            anvilPos[0] + 0.5,
            anvilPos[1],
            anvilPos[2] + 0.5
        ],
        entity => {
            entity.mergeNbt({
                BlockState: { Name: anvilId },
                Time: 0.5,
                HurtEntities: 1,
                FallHurtAmount: 2.0,
                FallHurtMax: 40
            })
        })
    scene.idle(10)  // 等待下落

    //scene.playSound("entity.anvil.land", 1, 1) 
    scene.world.removeEntity(fallingAnvil)
    if (anvilId == 'minecraft:anvil')
        scene.world.setBlock(anvilDownPos, 'minecraft:chipped_anvil', false)
    else
        scene.world.setBlock(anvilDownPos, anvilId, false)

    return anvilDownPos

}

const tagBlocks = [
    'anvilcraft:ferrite_core_magnet_block',
    'anvilcraft:hollow_magnet_block',
    'anvilcraft:magnet_block',
    'minecraft:lightning_rod'
]
Ponder.registry(event => {
    tagBlocks.forEach(block => {
        event.create(block)
            .scene("ponder_lightning", "避雷针测试", (scene, util) => {
                scene.showBasePlate()

                /**--------避雷针引雷----------**/
                CrossShape.forEach(pos => {
                    scene.world.setBlock(pos, "minecraft:iron_block", false)
                    scene.world.showSection(pos, Facing.UP)
                })
                scene.text(40, "放置铁十字架", CrossShape[0]).attachKeyFrame()

                scene.world.setBlock(RodPos, "minecraft:lightning_rod", false)
                scene.world.showSection(RodPos, Facing.UP)

                scene.world.setBlock(AnvilUp, "minecraft:anvil", false)
                scene.world.showSection(AnvilUp, Facing.DOWN)
                scene.idle(40)

                var anvilPos = anvilDrop(scene, 'minecraft:anvil', AnvilUp, AnvilDown)

                scene.world.createEntity("minecraft:lightning_bolt", [2.5, 3.5, 2.5])
                //scene.playSound("entity.lightning_bolt.impact", 1, 1) 

                CrossShape.forEach(pos => {
                    scene.particles.block(5, "minecraft:iron_block", [
                        pos[0] + 0.5,
                        pos[1] + 0.5,
                        pos[2] + 0.5
                    ])
                    scene.world.setBlock(pos, 'anvilcraft:hollow_magnet_block', false)

                })
                scene.text(40, "磁铁产出", [2.5, 1, 2.5]).attachKeyFrame()
                scene.idle(40)
                /** ------------当心爆炸----------------**/
                const n = 2
                for (let i = 0; i <= n; i++) {
                    scene.idle(20)
                    CrossShape.forEach(pos => {
                        scene.world.setBlock(pos, 'minecraft:iron_block', false)
                    })
                    scene.world.setBlock(anvilPos, 'minecraft:air', false)
                    anvilPos = anvilDrop(scene, 'minecraft:anvil', AnvilUp, AnvilDown)

                    if (i != n) {
                        scene.world.createEntity("minecraft:lightning_bolt", [2.5, 3.5, 2.5])
                        //scene.playSound("entity.lightning_bolt.impact", 1, 1) 

                        CrossShape.forEach(pos => {
                            scene.particles.block(5, "minecraft:iron_block", [
                                pos[0] + 0.5,
                                pos[1] + 0.5,
                                pos[2] + 0.5
                            ])
                            scene.world.setBlock(pos, 'anvilcraft:hollow_magnet_block', false)
                        })
                    }

                    else {

                        scene.world.createEntity("minecraft:lightning_bolt", [2.5, 3.5, 2.5])
                        //scene.playSound("entity.lightning_bolt.impact", 1, 1) 

                        scene.world.setBlock(RodPos, "minecraft:air", false)
                        scene.particles.simple(5, "minecraft:explosion", [2.5, 3, 2.5])
                        scene.particles.simple(5, "minecraft:smoke", [2.5, 3, 2.5])
                        //scene.playSound("entity.generic.explode", 1, 1) 
                        scene.text(40, "有小概率会发生爆炸", [2.5, 3, 2.5]).attachKeyFrame()
                        scene.idle(4)
                        anvilPos = anvilDrop(scene, 'minecraft:chipped_anvil', anvilPos, AnvilDownDown)

                        CrossShape.forEach(pos => {
                            scene.particles.block(5, "minecraft:iron_block", [
                                pos[0] + 0.5,
                                pos[1] + 0.5,
                                pos[2] + 0.5
                            ])
                            scene.world.setBlock(pos, 'anvilcraft:hollow_magnet_block', false)

                        })
                    }
                }
                scene.idle(40)
                /**---------------非普通铁砧会爆炸---------------------**/
                scene.world.setBlock(RodPos, "minecraft:lightning_rod", false)
                CrossShape.forEach(pos => {
                    scene.world.setBlock(pos, 'minecraft:iron_block', false)
                })

                scene.text(40, "过高等级的铁砧会损坏避雷针").attachKeyFrame()
                scene.world.setBlock(AnvilUp, 'anvilcraft:spectral_anvil', false)
                scene.world.showSection(AnvilUp, Facing.DOWN)
                scene.idle(20)
                scene.world.setBlock(AnvilUp, 'anvilcraft:royal_anvil', false)
                scene.idle(20)
                scene.world.setBlock(AnvilUp, 'anvilcraft:ember_anvil', false)
                scene.idle(20)
                scene.world.setBlock(AnvilUp, 'anvilcraft:transcendence_anvil', false)
                scene.idle(20)

                anvilPos = anvilDrop(scene, 'anvilcraft:transcendence_anvil', AnvilUp, AnvilDown)

                scene.world.setBlock(RodPos, "minecraft:air", false)
                scene.particles.simple(5, "minecraft:explosion", [2.5, 2, 2.5])
                scene.particles.simple(5, "minecraft:smoke", [2.5, 2, 2.5])
                scene.idle(4)
                anvilDrop(scene, 'anvilcraft:transcendence_anvil', anvilPos, AnvilDownDown)


                //scene.playSound("entity.generic.explode", 1, 1) 
                scene.text(40, "并且会发生爆炸", [2.5, 3, 2.5]).attachKeyFrame()
            })
    })

}) 
