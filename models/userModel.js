const mongoose =require('mongoose')

// schema
const userSchema =new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
       type:String,
       required:[true,'email is required'], 
       unique :true
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    userType:{
        type:String,
        required:[true,'user tye is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80',
    },
    answer:{
     type:String,
     required:[true,"Answer is required"],
    }
},{timestamps:true})

// export 
module.exports=mongoose.model('User',userSchema);