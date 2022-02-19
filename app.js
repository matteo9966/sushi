const express = require('express');
const app = express();
const notfound = require('./middleware/not-found')
const createTableRoute = require('./routes/createTable')
app.use(express.json());


app.get('/',(req,res)=>{
    res.send(
        '<h1>Hello from sushi server</h1>'
        )
    })

app.use('/api/v1',createTableRoute);
app.use(notfound)
        
const port = 5000;
app.listen(port,()=>console.log('listening on port 5000'))