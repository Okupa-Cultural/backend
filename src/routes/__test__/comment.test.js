const axios = require('axios');

const user_id = 1;
const post_id = 1;

const content = "this is an auto generated comment!";

test('Should post a comment', async () => {
    axios.post('/api/comment', { user_id , post_id , content })
        .then(res => {
            expect(res.status).toEqual(200);
            expect(res.data.content).toEqual(content);
        })
});