import User from "../models/user.js";
import bcrypt from "bcrypt";

const authentication = {
  login: async (req, res) => {
    const  {email, password} = req.body
    const user = await User.findOne({email})
    if(!user || user.state === 0) {
      return res.status(400).json({
        msg: 'Password o usuario inconrrectos'
      })
    }
    const validationPass = bcrypt.compareSync(password,user.password) 
    if(!validationPass) {
      return res.status(400).json({
        msg: 'Password o usuario inconrrectos'
      })
    }
    res.json({
      user
    })
  }
}

export default authentication