const User = require("./../models/user");
const { loginWithEmail, generateToken } = require('../services/authenticationService');

exports.getUser = async (req, response) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new Error(`Can't find user with id ${req.params.userId}`);
        }
        response.status(200).json({
            status: "success",
            data: { user }
        });
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.getUserList = async (request, response) => {
    try {
        const users = await User.find({}).limit(20);
        response.status(200).json({
            status: "success",
            data: { users }
        })
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.register = async (request, response) => {
    try {
        const user = await User.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        })

        const token = await generateToken(user);

        response.status(201).json({
            status: 'success',
            data: { user, token }
        })
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.updateMyProfile = async (request, response) => {
    try {
        const user = request.user;

        if (!user) {
            throw new Error(`Can't find the user that is requested`);
        }

        if (request.body.name) {
            user.name = request.body.name
        }
        if (request.body.password) {
            user.password = request.body.password;
        }

        user.save();

        response.status(200).json({
            status: "success",
            data: { user }
        });
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    };
}

exports.login = async (request, response) => {
    try {
        const { email, password } = request.body
        if (!email || !password) throw new Error("Email and password are required")
        console.log(email)
        const user = await loginWithEmail(email, password);
        console.log(`login ${user}`)
        const token = await generateToken(user);

        response.status(200).json({
            status: 'success',
            data: { user, token }
        })
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.getMyProfile = async (request, response) => {
    try {
        const user = request.user;

        if (!user) {
            throw new Error(`Can't find user`);
        }

        response.status(200).json({
            status: "success",
            data: { user }
        });
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.logout = async (request, response) => {
    try {
        const user = request.user 
        const token = request.token
        
        user.tokens = user.tokens.filter(el => el !== token);

        await user.save();
        console.log(`saved ${user}`)
        return response.status(200).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}