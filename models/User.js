const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    fullName:{type:String,required:true},
    userName:{type:String,required:true,Unique:true},
    age:{type:Number,required:true},
    password:{type :String,required:true}

})
module.exports=mongoose.model('User',userSchema)
