const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const User = require('../models/User');
sgMail.setApiKey('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')
console.log(process.env.JWT_ACCOUNT_ACTIVATION, "api")

exports.signup = asyncHandler(async (req, res) => {
    const { email } = req.body;
    await User.findOne({ email }).exec((err, user) => {
        console.log(email, user, err)
        if (user) {
            return res.status(400).json({ error: 'email is already taken' })
        }
        const token = jwt.sign(
            { email },
            'EREUuiue*120&^%^',
            { expiresIn: '10m' }
        )
        console.log(token)
        const emailData = {
            from: `chegu.mani9@gmail.com`,
            to: email,
            subject: `Account activation link`,
            html: `
                <h3>Please use the following link to activate your account</h3>
                <p>${`http://localhost:3000`}/auth/activate/${token}</p>
                <hr/>
                <p>This email may cotaine sensitive data</p>
                <p>${`http://localhost:3000`}</p>
            `
        }
        sgMail.send(emailData)
            .then(sent => {
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
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
            const { email } = jwt.decode(token);
            const user = new User({ email })
            user.save((err, user) => {
                if (err) {
                    console.log('Save user in account activation error')
                    return res.status(401).json({ error: 'error saving user in database, signup again' })
                }
                return res.json({ message: 'Signup success please signin' })
            })
        })
    }
    else {
        return res.json({ message: 'Something went wrong please try again later' })
    }
}