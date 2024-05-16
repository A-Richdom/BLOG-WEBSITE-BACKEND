const File = require('../Schemas/BlogSchema')
const {resHandler} = require('../Utility/ResHandler')
const upload = require('../Middlewares/Upload')
require('dotenv').config()



//POSTING BLOG
const postBlog = async(req, res) => {
    console.log(req.body);

    const imageName = req.file.filename
    const headLine = req.body.text

    try {
        //Check if the file or text was uploaded
        if (!req.file || !req.body.text) {
            return res.status(400).json({ error: "File/Text box is empty" });
        }

       const response = await File.create({ image: imageName, text: headLine })
        

        // res.status(200).json(newFile);

        return resHandler({ res, statusCode: 200, data: response })
            // Send a response back to the client
            // return res.status(200).json({ message: 'File uploaded successfully', avatar, username });
    } 
    catch (error) {
        return resHandler ({ res, statusCode: 400, data: {error: error.message} })
    }
};

//GETTING BLOG
const getBlogs = async(req, res) => {

    try {
        const response = await File.find();
        

        return resHandler({ res, statusCode:200, data: response })

        // const blogs = await File.find();
        // const blogsWithImages = blogs.map(blog => ({
        //     text: blog.text,
        //     imageUrl: `http://localhost:5000/images/${blog.image}`
        // }));
        // return blogsWithImages;

    } 
    catch (error) {
        return resHandler ({ res, statusCode: 400, data: {error: error.message} })
    }
};

//GET SINGLE BLOG
const getSingle = async(req, res) => {
    const {id} = req.params

    try {
        const response = await File.findById(id);

        return resHandler ({ res, statusCode: 200, data: response })
    } 
    catch (error) {
        return resHandler ({ res, statusCode: 400, data: {error: error.message} })
    }
};

//UPDATE BLOG
const updateBlog = async(req, res) => {
    const {id} = req.params
    const imageName = req.file
    const headLine = req.body.text

    try {
        const response = await File.findByIdAndUpdate(id, {image: imageName, text: headLine}, {
            new:true
        })
        return resHandler ({ res, statusCode:200, data: response })
    } 
    catch (error) {
        return resHandler ({ res, statusCode: 400, data: {error: error.message} })
    }
};

//DELETE BLOG
const deleteBlog = async(req, res) => {
    const {id} = req.params

    try {
        const response = await File.findByIdAndDelete({ _id: id });

        return resHandler({ res, statusCode: 200, data: response })
    } 
    catch (error) {
        return resHandler({ res, statusCode: 400, data: {error: error.message} })
    }
};


module.exports = { postBlog, getBlogs, getSingle, updateBlog, deleteBlog };