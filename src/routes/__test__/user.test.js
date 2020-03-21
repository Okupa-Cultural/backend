const axios = require('axios');

const random = Math.floor(Math.random() * 10000);
const username = `test_username_${random}`;
const email = `test_email_${random}@test.com`;
const password = `${random}`;
let token;

describe('should Login, Signup and Logout a new user', () => {
    
    test('should register a new user', async () => {
        await axios.post('/api/signup', { username, email, password })
            .then(res => {
                expect(res.status).toEqual(200);
            });
    });
    
    test('should login the new user', async () => {
        await axios.post('/api/login', { username , password })
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.data.token).toBeTruthy();
                token = res.data.token;
            });
    });

    test('should logout the new user', async () => {
        await axios.post('/api/logout', { username , token })
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.data.token).toBeFalsy();
                token = res.data.token;
            });
    });
    /*
    test('should return true while login with usuarioprueba' , async () => {
        let user = await searchUserByUsername('usuarioprueba').then(usuario => user = usuario);
        console.log(user);
        expect(user).toBeTruthy();
    });
    */
});