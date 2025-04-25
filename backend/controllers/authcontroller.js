import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: "All feilds required!details missing" })
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User Already existing!" })
        }
        const hashedpassword = await bcrypt.hash(password, 10) //bcrpty to encrypt the password
        const user = new userModel({ name, email, password: hashedpassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, message: "Signup successfully!", token })

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "email and password are required!" })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Login failed,Email or password wrong!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Login failed,Email or password wrong!" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({
            success: true, message: 'login successfully!!', token, user: {
                id: user._id,
                name: user.name,
            }
        });
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

export const logOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        return res.json({ success: true, message: "Logged out!" })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}

