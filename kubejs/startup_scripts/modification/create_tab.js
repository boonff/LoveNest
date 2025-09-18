StartupEvents.modifyCreativeTab('kubejs:tab', event => {
    let items = [
        'foand:poppy_melon',
        'foand:poppy_melon_sand'
    ]
    items.forEach(item => {
        event.add(item)
    }); 
})