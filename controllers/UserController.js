const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
// create user register user
exports.registerController = async (req, res) => {
     try {
          const { username, email, password } = req.body
          //validation
          if (!username || !email || !password) {
               return res.status(400).send({
                    success: false,
                    message: 'please fill all fields'
               })
          }
          // existing user 
          const existingUser = await UserModel.findOne({ email })
          if (existingUser) {
               return res.status(401).send({
                    success: false,
                    message: 'User already exist'
               })
          }

          const hashedPassword = await bcrypt.hash(password, 10);


          // Save new user 
          const user = new UserModel({ username, email, password: hashedPassword })
          await user.save()
          return res.status(201).send({

               success: true,
               message: 'New user Created',
               user
          })

     } catch (error) {
          console.log(error)
          return res.status(500).send({
               message: 'Error in Register Callback',
               success: false,
               error
          })

     }

};

//get all users
exports.getAllUsers = async (req, res) => {
     try {
          const users = await UserModel.find({});
          return res.status(200).send({
               userCount: users.length,
               success: true,
               message: "all users data",
               users,
          });
     } catch (error) {
          console.log(error);
          return res.status(500).send({
               success: false,
               message: "Error In Get ALl Users",
               error
          });
     }
};



//login
exports.loginController = async(req,res) => { 
     try {
          const { email, password } = req.body;
          //validation
          if (!email || !password) {
            return res.status(401).send({
              success: false,
              message: "Please provide email or password",
            });
          }
          const user = await UserModel.findOne({ email });
          if (!user) {
            return res.status(200).send({
              success: false,
              message: "email is not registerd",
            });
          }
          //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
     };

