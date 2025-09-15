const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

const getUser = async (req, res) => {
    try {
        const user = await User.find().select('-password')
        res.send({
            success: true,
            message: `User Server is running`,
            payload: { user }
        })
    } catch (error) {
        res.send({
            success: true,
            message: error,
        })
    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please type name, email, and password'
            })
        }

        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            return res.status(400).send({
                success: false,
                message: 'User already exists'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user: newUser
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Registration failed',
            error: error.message
        })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all inputs'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User not found, register before login'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send({
                success: false,
                message: 'Incorrect password'
            });
        }

        // Only send safe data in the token
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });


        return res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            token
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};

const changePass = async (req, res) => {
    try {
        const useremail = req.user.email;

        const user = await User.findOne({ email: useremail });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Invalid user'
            });
        }

        const { newpassword } = req.body;
        if (!newpassword) {
            return res.status(400).send({
                success: false,
                message: 'New password is required'
            });
        }

        // Check if new password is same as old
        const isMatchPass = await bcrypt.compare(newpassword, user.password);
        if (isMatchPass) {
            return res.status(400).send({
                success: false,
                message: 'Please enter a different password'
            });
        }

        // Hash and update password
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        const updatedUser = await User.findOneAndUpdate(
            { email: useremail },
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(500).send({
                success: false,
                message: 'Failed to change password. Try again'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Password changed successfully'
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to change password',
            error: error.message
        });
    }
};



const logoutUser = async (req, res) => {
    try {

        res.clearCookie('auth-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        return res.status(200).send({
            success: true,
            message: 'User logged out successfully'
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to logout',
            error: error.message
        });
    }
};


module.exports = {
    getUser,
    registerUser,
    loginUser,
    changePass,
    logoutUser,
}