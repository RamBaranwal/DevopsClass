const express = require('express');
const app = express();

const PORT = 8080

app.get('/', async(req , res)=>{
    res.send(`
        <h1>Welcome to my server</h1>
        <h2>name: Rohit</h2>
        `)
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})