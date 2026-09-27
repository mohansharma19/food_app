
const testUserController = async (req, res) => {
    try {
        return res.status(200).send({
            success: true,
            message: "Test User Data API"
        });
    } catch (error) {
        console.log("Error in Test API", error);
    }
};

module.exports = { testUserController };