const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
// Get User Info 
const getUserController = async (req, res) => {
    try {
        // Find user by ID from JWT 
        const user = await userModel.findById({ _id: req.user.id }, { _id: 0 });

        // Validation 
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }

        // Hide password
        user.password = undefined;

        // Response 
        return res.status(200).send({
            success: true,
            message: "User Get Successfully",
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error: error.message
        });
    }
};

// UPDATE USER
const updateUserController = async (req, res) => {
    try {
        // find
        const user = await userModel.findById({ _id: req.user.id });

        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // update
        const { userName, address, phone } = req.body;

        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        // save User
        await user.save();

        res.status(200).send({
            success: true,
            message: "user updated Successfully",
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error In Update User API",
            error
        });
    }
};
// UPDATE USER PASSWORD
const updatePasswordController =async(req,res)=>{
   try{
    //  find user 
    const user =await userModel.findById({_id:req.body.id})
    // valdiation 
    if(!user){
        return res.status(404).send({
            success:false,
            message:'User Not Found'
        })
    } 
    // get data from user
    const {oldPassword,newPassword}=req.body
    if(!oldPassword || !newPassword){
        return res.status(500).send({
            success:false,
            message:'Please Provide Old or New Password'
        })
    }
    // check user password  compare password
        const isMatch=await bcrypt.compare(oldPassword,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid old Password"
            })
        }
        var salt=bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newPassword ,salt);
        user.password=hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:"Password Updated!",
        })
   }catch(error){
     console.log(error)
     res.status(500).send({
        success:false,
        message:'Error In Password Update API',
        error
     })
   }
}

// REST PASSWORD
const resetPasswordController=async(req,res)=>{
try{
   const {email,newPassword,answer} =req.body
   if(!email || !newPassword || !answer){
    return res.status(500).send({
        success:false,
        message:'Please Provide All Fields'
    })
   }
   const user =await userModel.findOne({email,answer})
   if(!user){
    return res.status(500).send({
        success:false,
        message:'User Not Found or Invalid answer'
    })
   }
    var salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(newPassword ,salt)
    user.password=hashedPassword
    await user.save()
    res.status(200).send({
        success:true,
        message:'Password Reset SuccessFully',
    })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in PASSWORD RESET API ',
        error
    })
}
};
// DELETE PROFILE ACCOUNT
const deleteProfileController =async(req,res)=>{
  try{
   await userModel.findByIdAndDelete(req.params.id)
   return res.status(200).send({
    success:true,
    message:'Your account has been deleted'
   });
  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error In Delete Profile API'
    })
  }
}

module.exports = { getUserController, updateUserController,resetPasswordController,updatePasswordController,deleteProfileController};