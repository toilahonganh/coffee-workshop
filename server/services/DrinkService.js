const DrinkModel = require('../models/DrinkModel');


module.exports = {
    postDrinkService: async (drinkInfo) => {
        try {
            const existingDrink = await DrinkModel.findOne({ title: drinkInfo.title });
            if (existingDrink) {
                return "Drink already exists";
            } else {
                let drinkDoc = await DrinkModel.create({
                    title: drinkInfo.title,
                    price: drinkInfo.price,
                    size: drinkInfo.size,
                    image: drinkInfo.image,
                    type: drinkInfo.type
                })

                return drinkDoc;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getDrinkService: async (drinkInfo) => {
        try {
            const id = drinkInfo.id;
            let drinkDoc = await DrinkModel.findOne(id).populate("type");
            console.log(drinkDoc);

            return drinkDoc;

        } catch (error) {

        }
    }
}