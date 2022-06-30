const mongoose =require('mongoose')
const timestamps=require('mongoose-timestamp')
const bcrypt=require('bcrypt')
const User_Schema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:2,
        max:20,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        unique:true
    },
    hashedPassword:{
        type:String,
        required:true,
        min:4,     
    },
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    profilePicture:{
        type:String,
        required:false,
    }
},{timestamps})

User_Schema.methods.PasswordCompare=async function(password){
    try{
      return await bcrypt.compare(password,this.hashedPassword)
    }
    catch(error){
        console.log(error);
    }
}


module.exports=mongoose.model('users',User_Schema)