function getIngredient(input) {
    let result
    if ((typeof input) === "string" || Item.isItem(input)) {
        result = Ingredient.of(input)
    } else if ((typeof input) === "object" && 'id' in input && 'amount' in input) {
        result = { type: 'fluid_stack', fluid: input.id, amount: input.amount }
    } else if (Array.isArray(input) && input.length > 0) {
        result = getIngredient(input[0])
    } else {
        result = input
    }
    return result
}

function getItem(input) {
    let result
    if (typeof input === "string" || Item.isItem(input)) {
        result = Item.of(input)
    } else if ((typeof input) === "object" && 'id' in input && 'amount' in input) {
        result = getFluid(input)
    } else if (Array.isArray(input) && input.length > 0) {
        result = getItem(input[0])
    } else {
        result = input
    }
    return result
}

function getFluid(input) {
    let result
    if (typeof input === "string" || Item.isItem(input)) {
        result = Fluid.of(input, 1000)
    } else if (Array.isArray(input) && input.length > 0) {
        result = getFluid(input[0])
    } else
        result = input
    return result
}

function getBlock(input) {
    let result
    if (typeof input === "string") {
        result = BlockStatePredicate.of(input)
    } else if (Array.isArray(input) && input.length > 0) {
        result = getBlock(input[0])
    } else
        result = input
    return result
}

function getIngredients(ingredients) {
    if (Array.isArray(ingredients)) {
        return ingredients.map(i => getIngredient(i))
    } else {
        return [getIngredient(ingredients)]
    }
}

function getOutputs(outputs) {
    if (Array.isArray(outputs)) {
        return outputs.map(i => getItem(i))
    } else {
        return [getItem(outputs)]
    }
}

global.createSequenced = [
    'deploying',
    'filling',
    'pressing',
    'cutting'
].reduce((acc, key) => {
    acc[key] = (outputs, inputs) => {
        return {
            "type": "create:" + key,
            ingredients: getIngredients(inputs),
            results: getOutputs(outputs)
        }
    }
    return acc
}, {})

let createRecipes = {
    event: null,
    init: function (e) {
        this.event = e
        e.recipes.create = this

        let self = this
        let normal_recipes = [
            'filling',
            'emptying',
            'mixing',
            'compacting',
            'cutting',
            'deploying',
            'haunting',
            'item_application',
            'milling',
            'pressing',
            'sandpaper_polishing',
            'splashing',
            'crushing',
        ]
        normal_recipes.forEach(recipe => {
            self[recipe] = (outputs, inputs) => {
                let data = {
                    type: 'create:' + recipe,
                    ingredients: getIngredients(inputs),
                    results: getOutputs(outputs)
                }

                // 先注册配方：event.custom() 返回 Java 对象（UnknownKubeRecipe）
                let r = e.custom(data)

                // 不能往 Java 配方对象上挂 JS 方法——Rhino 2.8 会抛
                // "Java class ... has no public instance field or method named X"。
                // 所以返回纯 JS 包装对象，链式方法通过 r.merge() 修改已注册配方。
                let request = {
                    heated: () => { r.merge({ heat_requirement: 'heated' }); return request },
                    superheated: () => { r.merge({ heat_requirement: 'superheated' }); return request },
                    keepHeldItem: (input) => { r.merge({ keep_held_item: input }); return request },
                    processingTime: (input) => { r.merge({ processing_time: input }); return request }
                }

                return request
            }
        })
    },
    sequenced_assembly: function (outputs, input, recipes) {
        let r = this.event.custom({
            type: "create:sequenced_assembly",
            ingredient: getIngredients(input),
            results: getOutputs(outputs),
            sequence: recipes,
        })

        let request = {
            loops: (input) => { r.merge({ loops: input }); return request },
            transitionalItem: (input) => { r.merge({ transitional_item: getItem(input) }); return request }
        }

        return request
    },
    mechanical_crafting(output, pattern, key) {
        let r = this.event.custom({
            type: "create:mechanical_crafting",
            category: "misc",
            accept_mirrored: false,
            key: key,
            pattern: pattern,
            result: getItem(output)
        })

        let request = {
            showNotification: (input) => { r.merge({ show_notification: input }); return request },
            acceptMirrored: () => { r.merge({ accept_mirrored: true }); return request }
        }

        return request
    }
}



global.createRecipes = createRecipes 
