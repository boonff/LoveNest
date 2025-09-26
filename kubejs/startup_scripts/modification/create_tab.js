StartupEvents.modifyCreativeTab('foand:foand_tab', event => {
    let items = [
        'foand:melt_gem_block',
        'foand:gem_spring',
        'foand:lava_spring',
        'foand:andesite_sugar_block',
        'foand:andesite_sugar',
        'foand:bamboo_string',
        'foand:poppy_melon_slice',
        'foand:poppy_melon_juice'
    ]
    items.forEach(item => {
        event.add(item)
    }); 
})