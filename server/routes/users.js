const router = require("express").Router();
const { User, validate} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require('../controllers/userFetchController'); // get the controller 


router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({ email: req.body.email })

        if (user)
            return res.status(409).send({ message: "User with given email already exists"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });
        
        await newUser.save();

        res.status(201).send({message: "User created successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Internal Server Error"})
    }
})

// router.post("/get", async (req, res) => {
//     try {
//         // Extracting the username from the request body
//         const { username } = req.body;

//         if (!username) {
//             return res.status(400).send({ message: "Username is required" });
//         }

//         // Fetch the user with the specified username
//         const user = await User.findOne({ username }, { username: 1, email: 1, _id: 0 });

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }
        
//         res.status(201).send({message: "Fetched user successfully"})

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({message: "Internal Server Error Fetching User"})
//     }
// })

router.get('/get', userController.getUser);

module.exports = router;