const User = require("./../models/user");
var passwordHash = require('password-hash');

exports.createUser = async (request, response) => {
    try {
        var hashedPassword = passwordHash.generate(request.body.password);
        const user = await User.create({
            name: request.body.name, 
            email: request.body.email, 
            password: hashedPassword
        })
        response.status(200).json({
            status: 'success',
            data: { user}
        })
    } catch(error) {
        response.status(400).json({
            status: 'fail', 
            message: error.message
        })
    }
}

exports.updateUser = async (request, response) => {
    try {
        const user = await User.findById(request.body.id);
        if (!user) {
            throw new Error(`Can't find user with id ${request.body.id}`);
        }

        if (request.body.name) {
           user.name = req.body.name 
        }
        if (request.body.password) {
            user.password = req.body.password;
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
    } catch(error) {
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