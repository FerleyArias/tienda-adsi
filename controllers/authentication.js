import User from "../models/user.js";
import bcrypt from "bcrypt";
import validateJWT from "../middlewares/validar-jwt.js"

const authentication = {
  login: async (req, res) => {
    try {
      const  {email, password} = req.body
      const user = await User.findOne({email})
      if(!user || user.state === 0) {
        return res.status(400).json({
          msg: 'usuario o contraseña inconrrectos'
        })
      }
      const validationPass = bcrypt.compareSync(password,user.password) 
      if(!validationPass) {
        return res.status(400).json({
          msg: 'usuario o contraseña inconrrectos'
        })
      }

      const token = await validateJWT.generate(usuario.id);

      res.json({
        user,
        token
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "error del servidor"
      })
    }
  }
}

export default authentication