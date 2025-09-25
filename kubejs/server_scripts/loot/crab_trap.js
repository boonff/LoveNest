LootJS.lootTables(event => {

    event
        .getLootTable("anvilcraft:gameplay/crab_trap/common")
        .firstPool()
        .modifyItemEntry(itemEntry => {
            if (itemEntry.item.id === "anvilcraft:crab_claw")
                itemEntry.setWeight(15)
            if (itemEntry.item.id === "anvilcraft:minecraft:seagrass")
                itemEntry.setWeight(5)
        })

})
