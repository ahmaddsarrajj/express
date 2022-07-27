//bring express using the common j/s module syntax
//notes: we can't use import or es6 modules with node by default. if you do want to use it you'll have to use something
//like babel to compile it 
const express = require('express');
const members = require('./routes/memberRoute')
const logger = require('./middleware/logger');
const { use } = require('express/lib/router');
//initialise expressx
const app = express();


//body parser middleware
//express.urlencoded() Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. 
//This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(logger);

app.get('/' , (req , res) => {
    res.send('<h1>successful work</h1>')
})

app.use('/members' , members);

app.post('/' , (req , res) =>{

    const newMember = {
        id : 10,
        name : req.body.name
    }

    if(!newMember.name) res.status(400).json({ msg:'enter the complete information'}).end();

    members.push(newMember);
    //res.send('member added successfuly')
    res.json(members)
})



const PORT = process.env.PORT || 5000

//listen on the port 
app.listen(PORT , () => console.log(`server started on port ${PORT}`) );