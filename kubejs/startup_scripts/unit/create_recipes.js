let createRecipes = {
    event: null,
    init: function (e) {
        this.event = e;
        e.recipes.create = this;
    },
    filling: function (_result, _input) {
        let fluid = Fluid.of(_input[0]);
        let input = Item.of(_input[1]);
        let results;
        if (Array.isArray(_result)) {
            results = _result.map(result => Item.of(result));
        } else {
            results = [Item.of(_result)];
        }

        this.event.custom({
            type: 'create:filling',
            ingredients: [
                { item: input.id, count: input.count },
                { type: "fluid_stack", fluid: fluid.id, amount: fluid.amount }
            ],
            results: results.map(result => { return { id: result.id, count: result.count } })
        })
    },
    emptying: function (_result, _input) {
        let fluid = Fluid.of(_result[0]);
        let input = Item.of(_input);
        let result = Item.of(_result[1]);

        this.event.custom({
            type: "create:emptying",
            ingredients: [
                { item: input.id, count: input.count }
            ],
            results: [
                { id: result.id, count: result.count },
                { amount: fluid.amount, id: fluid.id }
            ]
        })
    }
}

global.createRecipes = createRecipes;