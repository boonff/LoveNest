BlockEvents.placed('foand:mica_nozzle', event => {
    const block = event.block
    if (block.pos.y >= 192)
        block.setBlockState(Block.getBlock("foand:mica_nozzle_lit"), 2)
})
