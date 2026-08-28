ServerEvents.recipes(event => {
    // 初始化全局配方
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)

    //活塞 -> 粘性活塞, 粘性活塞 -> 活塞
    event.remove({ output: 'sticky_piston' })
    event.shaped('sticky_piston', ['A'], { 'A': 'piston' })
    event.shaped('piston', ['A'], { 'A': 'sticky_piston' })
    // 铜灯
    event.remove({ output: 'minecraft:copper_bulb' })
    event.shaped('minecraft:copper_bulb', [
        ' B ',
        'BAB',
        ' C '
    ], {
        A: 'minecraft:lantern',
        B: 'minecraft:copper_ingot',
        C: 'minecraft:redstone'
    }
    )
    // 红石比较器
    event.remove({ output: 'minecraft:comparator' })
    event.shaped('minecraft:comparator', [
        ' A ',
        'ABA',
        'CCC'
    ], {
        A: 'minecraft:redstone_torch',
        B: 'minecraft:sugar',
        C: 'minecraft:stone'
    }
    )
    // 阳光传感器
    event.remove({ output: 'minecraft:daylight_detector' })
    event.shaped('minecraft:daylight_detector', [
        'AAA',
        'BBB',
        'CCC'
    ], {
        A: 'minecraft:glass',
        B: 'minecraft:sugar',
        C: '#minecraft:wooden_slabs'
    })
    // 侦测器
    event.remove({ output: 'minecraft:observer' })
    event.shaped('minecraft:observer', [
        'AAA',
        'BBC',
        'AAA'
    ], {
        A: 'minecraft:stone',
        B: 'minecraft:redstone',
        C: 'minecraft:sugar'
    })

    // 铁砧砸黑曜石产生黑曜石粉 
    event.custom({
        "type": "anvillib:in_world_recipe",
        "compatible": true,
        "conflicting": [],
        "non_conflicting": [
            {
                "type": "anvillib:has_block",
                "offset": [
                    0.0,
                    -1.0,
                    0.0
                ],
                "predicate": {
                    "blocks": "minecraft:obsidian",
                    "properties": []
                }
            }
        ],
        "icon": {
            "id": "create:powdered_obsidian",
            "count": 1
        },
        "outcomes": [
            {
                "type": "anvillib:spawn_item",
                "item": "create:powdered_obsidian",
                "offset": [
                    0.0,
                    0.5,
                    0.0
                ]
            }
        ],
        "priority": 5,
        "max_efficiency": 1,
        "trigger": "anvilcraft:on_anvil_fall_on"
    })

    // 铁砧砸朝下的机械钻头 + 下方有尸块 → 随机掉落金粒 TODO 随机采矿
    event.custom({
        "type": "anvillib:in_world_recipe",
        "compatible": true,
        "conflicting": [],
        "non_conflicting": [
            {
                "type": "anvillib:has_block",
                "offset": [
                    0.0,
                    -1.0,
                    0.0
                ],
                "predicate": {
                    "blocks": 'create:mechanical_drill',
                    "properties": [
                        { 'facing': 'down' }
                    ]
                }
            },
            {
                "type": "anvillib:has_block",
                "offset": [
                    0.0,
                    -2.0,
                    0.0
                ],
                "predicate": {
                    "blocks": 'foand:corpse_mass',
                    "properties": []
                }
            }
        ],
        "icon": {
            "id": "create:powdered_obsidian",
            "count": 1
        },
        "outcomes": [
            {
                "type": "anvillib:choose_one",
                "choices": [
                    //设置多个掉落物品，是为了随机掉落方向
                    {
                        "outcome": {
                            "type": "anvillib:spawn_item",
                            "item": 'minecraft:rotten_flesh',
                            "count": 1,
                            "offset": [0.5, -2.0, 0.7]
                        },
                        "weight": 3.0
                    },
                    {
                        "outcome": {
                            "type": "anvillib:spawn_item",
                            "item": 'minecraft:rotten_flesh',
                            "count": 2,
                            "offset": [0.4, -2.0, -0.3]
                        },
                        "weight": 3.0
                    },
                    {
                        "outcome": {
                            "type": "anvillib:spawn_item",
                            "item": 'minecraft:gold_nugget',
                            "count": 1,
                            "offset": [-0.8, -2.0, 0.5]
                        },
                        "weight": 2.0
                    },
                    {
                        "outcome": {
                            "type": "anvillib:spawn_item",
                            "item": 'minecraft:gold_nugget',
                            "count": 2,
                            "offset": [0.7, -2.0, 0.2]
                        },
                        "weight": 2.0
                    }
                ]
            }
        ],
        "priority": 5,
        "max_efficiency": 1,
        "trigger": "anvilcraft:on_anvil_fall_on"
    })

    // 测试配方
    event.recipes.create.compacting('minecraft:enchanted_golden_apple', 'minecraft:shulker_box[container=[{item:{count:64,id:"minecraft:gold_block"},slot:0},{item:{count:64,id:"minecraft:gold_block"},slot:1},{item:{count:64,id:"minecraft:gold_block"},slot:2},{item:{count:64,id:"minecraft:gold_block"},slot:3},{item:{count:64,id:"minecraft:gold_block"},slot:4},{item:{count:64,id:"minecraft:gold_block"},slot:5},{item:{count:64,id:"minecraft:gold_block"},slot:6},{item:{count:64,id:"minecraft:gold_block"},slot:7},{item:{count:64,id:"minecraft:gold_block"},slot:8},{item:{count:64,id:"minecraft:gold_block"},slot:9},{item:{count:64,id:"minecraft:gold_block"},slot:10},{item:{count:64,id:"minecraft:gold_block"},slot:11},{item:{count:64,id:"minecraft:gold_block"},slot:12},{item:{count:1,id:"minecraft:apple"},slot:13},{item:{count:64,id:"minecraft:gold_block"},slot:14},{item:{count:64,id:"minecraft:gold_block"},slot:15},{item:{count:64,id:"minecraft:gold_block"},slot:16},{item:{count:64,id:"minecraft:gold_block"},slot:17},{item:{count:64,id:"minecraft:gold_block"},slot:18},{item:{count:64,id:"minecraft:gold_block"},slot:19},{item:{count:64,id:"minecraft:gold_block"},slot:20},{item:{count:64,id:"minecraft:gold_block"},slot:21},{item:{count:64,id:"minecraft:gold_block"},slot:22},{item:{count:64,id:"minecraft:gold_block"},slot:23},{item:{count:64,id:"minecraft:gold_block"},slot:24},{item:{count:64,id:"minecraft:gold_block"},slot:25},{item:{count:64,id:"minecraft:gold_block"},slot:26}]]')

    // 1000mb瓜汁 + 1000mb岩浆 -> 1铁块
    event.recipes.create.mixing('minecraft:iron_block',
        [Fluid.of('foand:poppy_melon_juice', 1000), Fluid.lava(1000)])
})
