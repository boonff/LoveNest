ServerEvents.recipes(event => {
    // 初始化全局配方
    global.createRecipes.init(event)
    global.anvilcraftRecipes.init(event)

    /*-------------------------- 工作台 --------------------------*/
    // 云母收集器
    event.shaped('foand:mica_nozzle', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: "create:brass_ingot",
        B: "minecraft:redstone",
        C: "anvilcraft:nether_dust",
        D: "create:nozzle"
    })
})
