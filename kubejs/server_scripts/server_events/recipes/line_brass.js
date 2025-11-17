ServerEvents.recipes(event => {
    global.createRecipes.init(event)

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
