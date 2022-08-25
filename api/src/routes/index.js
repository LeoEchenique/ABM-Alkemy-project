const { Router } = require('express');
const { Wallet, Operation } = require("../db.js");
const { Calculator } = require("../Calculate_Balance/Calculator.js")
// Import all Controllers;
// Like const authRouter = require('./auth.js');
const router = Router();





router.post("/Operations/New", async (req, res) => {

    const { Reason, Mount, Type, Fk_wallet } = req.body;

    try {
        const wallet = await Wallet.findByPk(Fk_wallet);
        const balance = wallet.dataValues.Funds;
        const newBalance = Calculator(Type, Mount, balance);
        if (newBalance === "Denied") throw new Error("Not enough funds to realize the operation.");
        const date = new Date();
        const operation = await Operation.create({
            Reason,
            Mount,
            Type,
            Balance: newBalance,
            Date: date
        });
        await operation.setWallet(Fk_wallet);
        wallet.Funds = newBalance;
        await wallet.save();
        res.status(202).send({
            operation,
        });
    } catch (error) {
        res.status(402).send(error.message);
    }

})


router.get("/Operations/Latest", async (req, res) => {

    try {
        let operations = await Operation.findAll({
            limit: 10,
            order: [["Date", "DESC"]]
        })
        res.status(200).send(operations)
    } catch (error) {
        res.status(404).send(error.message)
    }


})


router.get("/Operations/All", async (req, res) => {


    try {
        let operations = await Operation.findAll({
            order: [["Date", "DESC"]]
        });
        res.status(200).send(operations)
    } catch (error) {
        res.status(404).send(error.message)
    }
})









module.exports = router;
