const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://vajaniharsh124:vajaniharsh124@cluster0.sniikzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const Userschema=mongoose.Schema({
    username:String,
    password:String
})
const User = mongoose.model('users',Userschema)



const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
})

const todo =mongoose.model('todos',todoSchema);
module.exports={
    todo,User
}