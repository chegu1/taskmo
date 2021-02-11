const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const User = require('../models/User');
sgMail.setApiKey('api')


exports.signup = asyncHandler(async (req, res) => {
    const { email, userTypeJobSeeker } = req.body;
    await User.findOne({ email }).exec((err, user) => {
        console.log(email, user, err)

        let otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp, "otp generated")
        const token = jwt.sign(
            { email, userTypeJobSeeker, otp },
            'EREUuiue*120&^%^',
            { expiresIn: '10m' }
        )
        console.log(token)
        const emailData = {
            from: `chegu.mani9@gmail.com`,
            to: email,
            subject: `Account activation link`,
            html: `
                <h3>Please use the following link and otp to activate your account</h3>
                <h3>OTP: ${otp}</h3>
                <p>${`http://localhost:3000`}/auth/activate/${token}</p>
                <hr/>
                <p>This email may cotaine sensitive data</p>
                <p>${`http://localhost:3000`}</p>
            `
        }
        sgMail.send(emailData)
            .then(sent => {
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to login to your account`
                })
            })
            .catch(err => {
                res.json({
                    message: err
                })
            })
    })
})

exports.accountActivation = (req, res) => {
    const { token } = req.body;
    if (token) {
        jwt.verify(token, 'EREUuiue*120&^%^', (err, decoded) => {
            if (err) {
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err)
                return res.status(401).json({
                    error: 'Link was expired, signup again'
                })
            }
            const { email, userTypeJobSeeker } = jwt.decode(token);
            const user = new User({ email, userTypeJobSeeker })
            user.save((err, user) => {
                if (err) {
                    console.log('Save user in account activation error')
                    return res.status(401).json({ error: 'error saving user in database, signup again' })
                }
                return res.json({ message: 'Signup success please signin', user, token })
            })
        })
    }
    else {
        return res.json({ message: 'Something went wrong please try again later' })
    }
}
