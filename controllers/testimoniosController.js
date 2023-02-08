// import generarId from "../helpers/generarId.js";
import Testimonios from "../models/Testimonios.js";

const agregarTestimonio = async (req, res) => {
    
    try {

        const testimonio = new Testimonios(req.body);
        await testimonio.save();


        res.json({msg: 'Testimonio creado correctamente'});
        
    } catch (error) {
        console.log(error);
    }
}

const editarTestimonio = async (req, res) => {

    const { id } = req.params;
    
    try {

        const testimonio = await Testimonios.findById(id);
        if(!testimonio) {
        return res.status(404).json({msg: 'El testimonio que estas buscando no existe'}); 
        };

        testimonio.descripcion = req.body.descripcion || testimonio.descripcion;

        const testimonioAlmacenado = await testimonio.save();
        res.json(testimonioAlmacenado);
        
    } catch (error) {
        console.log(error);
    }
}

const eliminarTestimonio = async (req, res) => {

    const { id } = req.params;
    
    try {

        const testimonio = await Testimonios.findById(id);
        if(!testimonio) {
        return res.status(404).json({msg: 'El testimonio que estas buscando no existe'}); 
        };


        await testimonio.deleteOne();
        res.json({ msg: 'Testimonio eliminado'});
        
    } catch (error) {
        console.log(error);
    }
}

export {
    agregarTestimonio,
    editarTestimonio,
    eliminarTestimonio
}
