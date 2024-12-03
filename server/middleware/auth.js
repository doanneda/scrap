const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // First try to get the token from the 'Authorization' header (with Bearer token)
    let token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token in the 'Authorization' header, check the 'x-auth-token' header
    if (!token) {
        token = req.header('x-auth-token');
    }

    // If no token found at all
    if (!token) {
        return res.status(401).send({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user information to the request object (req.user)
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid token error
        res.status(400).send({ message: 'Invalid token.' });
    }
};

module.exports = auth;


// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).send({ message: 'Access Denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).send({ message: 'Invalid Token' });
//     }
// };

// module.exports = auth;

// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (!token) return res.status(401).send({ message: 'Access Denied. No token provided.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Add user info to the request object
//     next();
//   } catch (ex) {
//     res.status(400).send({ message: 'Invalid token.' });
//   }
// };

// module.exports = auth;