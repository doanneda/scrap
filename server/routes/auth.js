const router = require("express").Router();
const { User } = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body); // Validates username and password
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // Change the query to search for username instead of email
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).send({ message: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid username or password" });
        }

        const token = user.generateAuthToken(); // Generates auth token for the user
        res.status(200).send({ data: token, message: "Logged in successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});


const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required().label("Username"),  // Change email to username
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = router;