const express = require('express');
const router = express.Router();
const members = require('../data/Members');
const { process_params } = require('express/lib/router');

//get all
router.get('/' , (req , res) =>{
    res.json(members)
})

//get single
router.get('/:id' , (req , res) =>{
    //some is a method return bollean that check if there is similar data or no 
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(!found) res.status(400).json({msg : `there are not a member with id ${req.params.id}`}).end();
        
    res.json(members.filter(member=> member.id === parseInt(req.params.id)));    
});

//create counter for the id
    var lastId = members.length++;
    var counter = lastId++;
    
//post member
router.post('/' , (req , res) =>{

    const newMember = {
        id : counter,
        name : req.body.name
    }

    if(!newMember.name) res.status(400).json({ msg:'enter the complete information'}).end();

    members.push(newMember);
    //res.send('member added successfuly')
    res.json(members)
})

//update member
router.put('/:id' , (req , res) =>{
    //some is a method return bollean that check if there is similar data or no 
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(!found) res.status(400).json({msg : `there are not a member with id ${req.params.id}`}).end();
    
    const updMember = req.body;
    members.forEach(member =>{
        if(member.id === parseInt(req.params.id)){
            member.name = updMember.name ? updMember.name : member.name
            res.json({ msg : "updated successfully" , members} )
        }
    })    
});

//delete member
router.delete('/:id' , (req , res) =>{
    //some is a method return bollean that check if there is similar data or no 
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(!found) res.status(400).json({msg : `there are not a member with id ${req.params.id}`}).end();
    
    res.json({ msg:"member deleted" , members : members.filter(member => member.id !== parseInt(req.params.id))
    })    
});

module.exports = router;