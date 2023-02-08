import mongoose from "mongoose";

const testimoniosSchema = mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    id: {
        type: String
    }
    
});


const Testimonios = mongoose.model('Testimonios', testimoniosSchema);
export default Testimonios;