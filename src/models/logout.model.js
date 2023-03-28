const mongoose = require("mongoose")

const logoutSchema = mongoose.Schema ({
   logout_time:{type:String}
})
const loginSchema = mongoose.Schema({
   login_time:{type:String}
})

const logout_model = mongoose.model("logout",logoutSchema)
const login_model = mongoose.model("login",loginSchema)
module.exports = {logout_model,login_model}