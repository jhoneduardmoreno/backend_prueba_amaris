
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import testimoniosRoutes from './routes/testimoniosRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            //Puede consultar la API
            callback(null, true);
        } else {
            //No esta permitido
            callback(new Error('Error de Cors'));
        }
    }
}

app.use(cors(corsOptions));

//Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/testimonios', testimoniosRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});