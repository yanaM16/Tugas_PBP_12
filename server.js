const express = require('express');
const { body, validationResult } = require('express-validator');
const joi = require('joi');

const app = express();
const port = 3000;

app.use(express.json());

// Middleware untuk validasi input route menggunakan express-validator
const validateInput = [
    body('username')
        .isLength({ min: 5})
        .withMessage('Panjang Username mininal 5 karakter'),
    
    body('email')
        .isEmail()
        .withMessage('Format email tidak valid')
    // Tambahkan validasi lain sesuai kebutuhan
];

// Middleware untuk validasi input route menggunakan Joi
const validateInputJoi = (req, res, next) => {
    const schema = joi.object({
        username: joi.string().min(5).required(),
        email: joi.string().email().required(),
        // Tambahkan validasi lain sesuai kebutuhan
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details[0].message });
    }

    next();
};

app.post('/user', validateInput, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    // Pemrosesan data user
    res.json({ message: 'Data user valid!' });
});

// Contoh route dengan validasi menggunakan Joi
app.post('/user-joi', validateInputJoi, (req, res) => {
    // Pemrosesan data user
    res.json({ message: 'Data user valid!' });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});