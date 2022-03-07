//Basic setup
const express = require('express');
const res = require('express/lib/response');
const app = express();
app.get('/', () => {
    res.send('Stuff');
});
app.listen(3000);