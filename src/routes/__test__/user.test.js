const axios = require('axios');

const { searchUserByUsername , userAlreadyExists } = require('../../lib/search');

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
            }).catch(err => console.log(err));
    });
    
    test('should login the new user', async () => {
        await axios.post('/api/login', { username , password })
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.data.token).toBeTruthy();
                token = res.data.token;
            }).catch(err => console.log(err));
    });

    test('should logout the new user', async () => {
        await axios.post('/api/logout', { username , token })
            .then(res => {
                console.log(res.data);
                expect(res.status).toEqual(200);
                expect(res.data.token).toBeFalsy();
                token = res.data.token;
            }).catch(err => console.log(err));
    });
    
    test('should return true while login with usuarioprueba' , async () => {
        userAlreadyExists('usuarioprueba')
            .then(user => {
                console.log(user);
                console.log("hi");
                expect(user).toBeTruthy();
            }).catch(err => console.log(err));
    });
    
});