const mongoose=require('mongoose')



const prodcuctSchema=mongoose.Schema({

    productName:{type:String,required:true,unique:true},

    productPrice:{type:Number,required:true},

    productUnit:{type:String,required:true},

    productDescription:{type:String,required:true},

})



module.exports=mongoose.model('product',prodcuctSchema)