const express = require('express')
const { postBlog, 
        getBlogs, 
        getSingle, 
        updateBlog, 
        deleteBlog
     } = require('../Controllers/BlogController')
const upload = require('../Middlewares/Upload');


const router = express.Router();



router.post('/postBlog', upload.single('file'), postBlog);
router.get('/getBlogs', getBlogs);
router.get('/getSingle/:id', getSingle);
router.patch('/updateBlog/:id', upload.single('file'), updateBlog);
router.delete('/deleteBlog/:id', deleteBlog);

module.exports = router;
