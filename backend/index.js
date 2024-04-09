const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const port=3000;
const cors=require('cors');
const zod=require("zod");
const {todo,User}= require("./db");
app.use(express.json());
const {JWT_SECRET}= require("../JWT_SECRET.cjs")
const jwt= require("jsonwebtoken");
const userMiddleware=require("./Middleware.js")
const createTodo=zod.object({
    title:zod.string(),
    description:zod.string()
})

const updateTodo=zod.object({
    id:zod.string()
})
const deleteTodo=zod.object({
    id:zod.string()
})
app.use(cors());
app.post('/signup', async(req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    console.log('a');
        try{
            const newUser=await User.findOne({username:username})

        if(newUser){
            res.json({
                msg:"this username is taken... try some other"
            })
        }
        else{
            User.create({
                username:username,
                password:password
            })
            console.log('b');
        }   
        }
        catch(err){
            res.json({
                err: err.message
            })
        }
        
});
app.post('/signin', async(req, res) => {
    const username=req.body.username;
    const password= req.body.password;
    // console.log(username)
    // console.log(password)
    const user = await User.findOne({
        username,password
    })
    // console.log(user)
    if(user){
        const token= jwt.sign({
            username
        },JWT_SECRET)

        res.json({
            token
        })
        module.exports={
            token
        }
    }
    else{
        res.status(411).json({
            msg:"invalid username, password"
        })
    }
});

app.post('/todo',userMiddleware,async function(req,res){
    const payload=req.body;
    const parsedPayload=createTodo.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({

            msg:payload
        })

        return;
    }

    await todo.create({
        title: payload.title,
        description: payload.description,
        completed: false
    })
    res.json({
        msg:"new todo added"
    })
})
app.get('/todos',userMiddleware,async function(req,res){
    const username=req.headers.username;

    const todos= await todo.findOne({
        username:username
    });
    
    // console.log(todos);
    res.json({todos})
})
app.put('/completed/:_id',async function(req,res){
    
    const id=req.params._id;
    
    await todo.updateOne(
            { _id: id }, // Convert id to ObjectId if needed
            {completed : true}
        );

     res.json("updated")
     
    
})
app.delete('/delete/:_id',userMiddleware,async function(req,res){
    const _id=req.params._id;

    await todo.deleteOne({_id});
    res.status(200).json("deleted successfully");
})
app.listen(port,()=>{
    console.log(`listening on port number ${port}`);
})