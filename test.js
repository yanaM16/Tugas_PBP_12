const axios = require('axios');

// Uji coba POST /user menggunakan express-validator
const testExpressValidator = async () => {
    try {
        const response = await axios.post('http://localhost:3000/user', {
            username: 'Rayhan',
            email: 'invalidemail.com', // Email tidak valid
        });
        console.log('Response from /user (express-validator):', response.data);
    } catch (error) {
        console.log('Error from /user (express-validator):', error.response.data);
    }
};

// Uji coba POST /user-joi menggunakan Joi
const testJoiValidator = async () => {
    try {
        const response = await axios.post('http://localhost:3000/user-joi', {
            username: 'Rayhan',
            email: 'invalidemail.com', // Email tidak valid
        });
        console.log('Response from /user-joi (Joi):', response.data);
    } catch (error) {
        console.log('Error from /user-joi (Joi):', error.response.data);
    }
};

// Menjalankan uji coba
const runTests = async () => {
    console.log('Testing /user route with express-validator...');
    await testExpressValidator();

    console.log('\nTesting /user-joi route with Joi...');
    await testJoiValidator();
};

runTests();