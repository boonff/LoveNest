ServerEvents.recipes(event => {
    // 初始化全局配方
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)
    // 工作台
    event.shaped('minecraft:bamboo_planks', [
        'AA',
        'AA'
    ], {
        A: 'minecraft:bamboo'
    })//竹板

    event.remove({ output: 'minecraft:bamboo_block' })
    event.shaped('minecraft:bamboo_block', [
        'AAA',
        'A A',
        'AAA'
    ], {
        A: 'minecraft:bamboo'
    })//竹块

    event.shaped("foand:bamboo_string", ['A'], { A: 'minecraft:bamboo' })// 竹子 -> 竹线

    event.shaped({ item: 'minecraft:scaffolding', count: 6 }, [
        'ABA',
        'A A',
        'A A'
    ], {
        A: 'minecraft:bamboo',
        B: 'foand:bamboo_string'
    })  // 脚手架

    event.shaped('woodenbucket:wooden_bucket', [
        'A A',
        ' A ',
    ], {
        A: 'minecraft:bamboo_block'
    }) // 木桶

    event.remove({ output: 'minecraft:spyglass' }) // 移除望远镜原版配方
    event.shaped('minecraft:spyglass', [
        ' A ',
        ' B ',
        ' B '
    ], {
        A: 'minecraft:glass',
        B: 'minecraft:copper_ingot'
    }) // 望远镜

    event.remove({ output: 'sticky_piston' })
    event.shaped('sticky_piston', ['A'], { 'A': 'piston' }) //活塞 -> 粘性活塞
    event.shaped('piston', ['A'], { 'A': 'sticky_piston' }) //粘性活塞 -> 活塞

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
    )// 铜灯

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
    )// 红石比较器

    event.remove({ output: 'minecraft:daylight_detector' })
    event.shaped('minecraft:daylight_detector', [
        'AAA',
        'BBB',
        'CCC'
    ], {
        A: 'minecraft:glass',
        B: 'minecraft:sugar',
        C: '#minecraft:wooden_slabs'
    })// 阳关传感器

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

    // 使用 Item.of 创建带 NBT 的烈焰人头
    // const blaze_head = 'minecraft:player_head[profile={id:[I;1278799121,1500139476,-1424152845,-2034119764],name:"MHF_Blaze",properties:[{name:"textures",value:"ewogICJ0aW1lc3RhbXAiIDogMTc1OTU4MjU2NDk3NiwKICAicHJvZmlsZUlkIiA6ICI0YzM4ZWQxMTU5NmE0ZmQ0YWIxZDI2ZjM4NmMxY2JhYyIsCiAgInByb2ZpbGVOYW1lIiA6ICJNSEZfQmxhemUiLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZDA2ZTM0MmY5MGVjNTM4YWFhMTU1MmIyMjRmMjY0YTA0MDg0MDkwMmUxMjZkOTFlY2U2MTM5YWE1YjNjN2NjMyIKICAgIH0KICB9Cn0="}]}]'
    const blaze_head = 'foand:blaze_head'
    event.recipes.create.item_application(
        'create:blaze_burner',
        ['create:empty_blaze_burner', blaze_head]
    )

    // 注液
    event.recipes.create.filling(blaze_head,
        ['#create:packages', Fluid.of('foand:blaze', 1000)])//纸箱+烈焰血 -> 烈焰人头

})