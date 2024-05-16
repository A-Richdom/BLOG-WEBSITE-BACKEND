const Admin = require('../Schemas/AdminSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const nodemailer = require('nodemailer')


const createToken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SEC,
        {// expiresIn: process.env.JWT_EXP
            expiresIn: '1min'
        })
};


//SIGN-UP FUNCTION
const handleSignUp = async (req, res) => {
    const { name, email, password } = req.body

    try {
        //For Checking Existing Email
        const user = await Admin.findOne({ email });

        if (user?.email) {
            console.log(user);

            res.status(400).json({ message: 'Email already exist', status: "error" });
            return;
        }

        //Hash Password
        const salt = await bcrypt.genSalt()
        let hashedPassword = await bcrypt.hash(password, salt)

        const response = await Admin.create({ name, email, password: hashedPassword })

        res.status(200).json({ success: { message: "Email has been registered" } })
        console.log(response);
        return;
    }

    catch (error) {
        res.status(400).json({ error: { message: 'Authentication Error', status: "error" } });
    }
};


//LOGIN FUNCTION
const handleLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        //For Email
        const user = await Admin.findOne({ email })
        // console.log(user,'gggg')
        if (!user) {
            res.status(404).json({ message: "User is not registered", status: "error" })
            return
        }
        //For Password Compare
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            res.status(404).json({ message: "Password is incoorrect", status: "error" })
            return
        }

        const token = createToken(user._id)

        console.log("Logged in", token);

        res.status(200).json({ message: "You are Logged in", user, token })
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

//GET USER FUNCTION
const getUser = async (req, res) => {
    const id = req.user.id

    try {
        const response = await Admin.findById(id).select("id name email ")

        if (!response) return res.status(404).json({ message: 'An Error Occur' })

        res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
    }
};

//FORGOT PASSWROD
const handleForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Admin.findOne({ email })
        if (!user) {
            res.status(404).json({ message: 'User not registered', status: error })
            return
        }

        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'anigilajeridwanolalekan@gmail.com',
        //       pass: 'agon jskn dzyi rsig'
        //     }
        //   });
        //   console.log(transporter);
          
        //   var mailOptions = {
        //     from: 'anigilajeridwanolalekan@gmail.com',
        //     to: 'anigilajeridwan@yahoo.com',
        //     subject: 'Sending Email using Node.js',
        //     text: 'That was easy!'
        //   };
          
        //   transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

};


module.exports = { handleSignUp, handleLogin, getUser, handleForgotPassword }