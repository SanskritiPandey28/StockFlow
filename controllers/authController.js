const { registerUser,loginUser } = require("../services/authService");


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await registerUser(name, email, password);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


const login = async(req,res) =>{
    try{
        const{email,password} = req.body;
        const result = await loginUser(email,password);
         res.status(200).json({
            message: "User logged in  successfully",
            token:result.token,
            user: {
                email: result.user.email,
               
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
    };


module.exports = {
    register, login
};