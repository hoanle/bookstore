const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('./../models/user');

const loginWithEmail = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error(`Can not find user with email ${email}`)
    }
    
    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
        throw new Error(`Unable to login`);
    }
    console.log(`loginWithEmail ${user}`)
    return user;
}

const generateToken = async (user) => {
    console.log(`generateToken ${user}`);
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});
    user.tokens.push(token)
    await user.save();
    return token;
}

const authenticate = async (request, response, next) => {
    if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer')) {
        return response.status(401).json({
            status: 'fail', 
            message: 'Unauthorized'
        })
    }

    const token = request.headers.authorization.replace('Bearer ', "");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findOne({ _id: decoded.id, tokens: token });
        if (!user) throw new Error("Unauthorized");
        console.log(`user ${user}`);
        request.user = user;
        request.token = token;
      } catch (err) {
        return response.status(401).json({ status: "fail", message: err.message });
      };
      next();
}

module.exports = {
    loginWithEmail,
    generateToken,
    authenticate
}