const router = require("express").Router();
const { User, validate} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Middleware to authenticate user using JWT
const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ message: "Access Denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.userId = decoded._id; // Attach the user ID to the request object
        next();
    } catch (err) {
        res.status(400).send({ message: "Invalid Token" });
    }
};

// GET: Retrieve Current User Details
router.get("/me", authenticateUser, async (req, res) => {
    try {
        // Fetch user details from the database
        const user = await User.findById(req.userId).select("-password"); // Exclude password field
        if (!user) return res.status(404).send({ message: "User not found" });

        res.status(200).send(user); // Send user details as the response
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;