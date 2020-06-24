const Author = require("./../models/author");

exports.createAuthor = async (request, response) => {
    try {
        const author = await Author.create({ name: request.body.name, email: request.body.email });
        await author.save();
        response.status(200).json({
            status: "success",
            data: { author }
        });
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error
        });
    };
};

exports.updateAuthor = async (request, response) => {
    try {
        const author = await Author.findByIdAndUpdate(
            request.body.id,
            { name: request.body.name },
            { new: true }
        );

        response.status(200).json({
            status: "success",
            data: { author }
        });
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error
        });
    };
}

exports.deleteAuthor = async (request, response) => {
    try {
        await Author.findByIdAndDelete(request.body.id);

        response.status(204).json({
            status: "success",
            data: null
        });
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    };
}

exports.getAuthor = async (request, response) => {
    try {
        const author = await Author.findById(request.params.authorId);
        if (!author) {
            throw new Error(`Can't find author with id ${request.params.authorId}`);
        } 
        response.status(200).json({
            status: "success",
            data: { author }
        });
    } catch(error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.getAuthorList = async (request, response) => {
    try {
        const authors = await Author.find({}).limit(20);
        response.status(200).json({
            status: "success",
            data: { authors }
        })
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}