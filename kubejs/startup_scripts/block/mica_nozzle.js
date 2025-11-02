
StartupEvents.registry('block', event => {
    event.create('foand:mica_nozzle')
        .hardness(2)
        .resistance(10)
        .box(1, 0, 1, 15, 14, 15)
});
