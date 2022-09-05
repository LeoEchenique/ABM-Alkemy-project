
const { Router } = require('express');
const { Wallet, User } = require("../../db");
const router = Router();

router.get("/:token", async (req, res) => {

    // with user registred this will recive an Id to match the correspondent wallet.
    // const {id}= req.boy or whatever..

    const { token } = req.params;

    try {

        const wallet = await User.findOne({
            where: {
                Token: token
            },
            include: "Wallet",
        });
        return res.status(200).send(wallet.Wallet)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;