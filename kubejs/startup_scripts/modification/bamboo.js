ItemEvents.modification(event => {
    event.modify('minecraft:bamboo', item => {
        item.setFood(2, 0.5);
    });
})