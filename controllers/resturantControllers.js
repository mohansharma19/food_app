// const router = require("../routes/resturantRoutes")

const resturantModel = require("../models/resturantModel");

// Create Resturant
const createResturantController=async(req,res)=>{
    try{
      const {
        title,
        imageUrl,
        foods,
        pickup,
        time,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
    }=req.body;
    // validation
    if(!title || !coords){
        return res.status(500).send({
            success: false,
            message:"Please Provide title and address",
        })
    }
    const newResturant=new resturantModel({
        title,
        imageUrl,
        foods,
        pickup,
        time,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
    })
    await newResturant.save()
    res.status(201).send({
        success:true,
        message:"New Resturant Created Successfully",
    });
    }catch(error){
       console.log(error)
       res.status(500).send({
        success:false,
        message:'Error In Create Resturant Api',
        error
       })
    }
}
// get all resturant
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});

    if (!resturants || resturants.length === 0) {
      return res.status(404).send({
        success: false,
        message: "NO Restaurant Available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants: resturants,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error In Get All Restaurant API",
      error,
    });
  }
};

// Get resturant by ID
const getAllResturantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Restaurant ID",
      });
    }

    // Find restaurant
    const resturant = await resturantModel.findById(restaurantId);

    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found",
      });
    }

    // Send restaurant
    res.status(200).send({
      success: true,
      message: "Restaurant Found",
      resturant,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error In Get Restaurant By ID API",
      error,
    });
  }
};
// DELETE RESTURANT
 const deleteResturantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Restaurant ID",
      });
    }

    const resturant = await resturantModel.findByIdAndDelete(restaurantId);

    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      error,
    });
  }
};
module.exports={createResturantController,getAllResturantController,getAllResturantByIdController,deleteResturantController};