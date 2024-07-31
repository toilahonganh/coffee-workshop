const { postDrinkService, getDrinkService } = require("../services/DrinkService");


module.exports = {
    postDrinkController: async (req, res) => {
        try {
            const drinkInfo = req.body;

            const drinkDoc = await postDrinkService(drinkInfo);
            res.json(drinkDoc);
            res.status(200).json({
                EC: 1,
                data: drinkDoc
            })

        } catch (error) {

        }
    },
    getDrinkController: async (req, res) => {
        try {
            let drinkInfo = req.body;
            let drinkDoc = await getDrinkService(drinkInfo.id);
            return res.status(200).json({
                EC: 1,
                data: drinkDoc
            })

        } catch (error) {

        }
    }
}