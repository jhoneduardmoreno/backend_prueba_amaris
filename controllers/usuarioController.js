import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";


const autenticar = async (req, res) => {

    const{email, password} = req.body;

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }


    //Comprobar su Password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        })
    } else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }

}


const agregarUsuarios = async (req, res) => {

    // Evitar registros duplicados
    const { email, rol } = req.body;
    const existeUsuario = await Usuario.findOne({ email: email});

    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    //Verificar si la persona que está intentando crear usuarios es administrador
    // const esadmin = await Usuario.findOne({ rol: rol});

    // if(esadmin !== 'admin'){
    //     const error = new Error('Solo los administradores puede crear usuarios');
    //     return res.status(400).json({msg: error.message});
    // }
   
    try {

        const usuario = new Usuario(req.body);
        await usuario.save();


        res.json({msg: 'Usuario creado correctamente'});
        
    } catch (error) {
        console.log(error);
    }
    
}

const perfil = async (req, res) => {
    const { usuario } = req;

    res.json(usuario);
}

export {
    agregarUsuarios,
    autenticar,
    perfil 
}