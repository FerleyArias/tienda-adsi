import jwt from "jsonwebtoken";
import User from "../models/user.js";

const validateJWT = {
  generate: (id) => {
    return new Promise((resolve, reject) => {
      const payload = { uid: id };
      jwt.sign(
        payload,
        process.env.SECRETPRIVATEKEY,
        {
          expiresIn: "24h",
        },
        (err, token) => {
          if (err) {
            reject("No se pudo generar el token");
          } else {
            resolve(token);
          }
        }
      );
    });
  },
  validate: async (req, res, next) => {
    const token = req.header("token");
  
    if (!token) {
      return res.status(401).json({
        msg: "No existe token en la petición",
      });
    }
  
    try {
      const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
      const user = await User.findById(uid);
      if (!user || user.state === 0) {
        return res.status(401).json({
          msg: "Token no válido",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        msg: "Token no valido",
      });
    }
  }
}

export default validateJWT
