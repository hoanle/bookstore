const Genre = require("./../models/genre");

exports.createGenre = async (request, response) => {
    try {
        const genre = await Genre.create({
            name: request.body.name, 
        })
        response.status(200).json({
            status: 'success',
            data: { genre }
        })
    } catch(error) {
        response.status(400).json({
            status: 'fail', 
            message: error.message
        })
    }
}

exports.updateGenre = async (request, response) => {
    try {
        const genre = await Genre.find({name: request.body.name});
        if (!genre) {
            throw new Error(`Can't find genre with name ${request.body.name}`);
        } 
        genre.save();

        response.status(200).json({
            status: "success",
            data: { genre }
        });      
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    };
}

exports.getGenre = async (request, response) => {
    try {
        const genre = await Genre.findById(request.params.genreId);
        if (!genre) {
            throw new Error(`Can't find genre with name ${request.params.genreId}`);
        } 
        response.status(200).json({
            status: "success",
            data: { genre }
        });
    } catch(error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.getGenreList = async (request, response) => {
    try {
        const genres = await Genre.find({}).limit(20);
        response.status(200).json({
            status: "success",
            data: { genres }
        })
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}