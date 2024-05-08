const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const usuarioSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['administrador', 'cliente'],
        default: 'cliente',
        required: true
    },
    carrito:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedidos',
        default: []
    } 
})
usuarioSchema.methods.encryptClave = async (contraseña) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(contraseña, salt);
}
module.exports = mongoose.model('Usuario', usuarioSchema);