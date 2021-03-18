import jwt from "jsonwebtoken"

const validatorJWT = {
  generate: (id) => {
    return new Promise((resolve,reject) => {
      const payload = {uid:id}
      jwt.sign(
        payload,
        process.env.SECRETPRIVATEKEY,
        {
          expiresIn: '4h'
        },
        (err,token)=> {
          if(err) {
            reject('No se pudo generar el token')
          } else {
            reject(token)
          }
        }
      )
    })
  },
  validate: async (req, res) => {
    const token = req.header('token')
    if(!token) {
      return res.status(401).json({
        msg: 'No existe toke en la peticion'
      })
    }

    try {
      const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY)

      const usuario=await Usuario.findById({_id:uid})

      if( !usuario  || usuario.estado ==0) {
        return res.status(401).json({
            msg: 'Token no invalido'
        })
      }
      
      req.usuario=usuario;
        
      next();

    } catch (error) {
      console.log(error);
        res.status(401).json({
            msg:'Token invalido'
        })
    }
  }

}

export default validatorJWT