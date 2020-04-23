var mongoose = require('mongoose');

var modelSchema= mongoose.Schema({
    sabor: {
        type: String,
        required: [true, 'Seleccione un sabor']
    },
    entrega: {
        type: String,
        required: [true, 'Seleccione una forma de envio']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    fechaPedido: {
        type: String,
        required: true
    },
    fechaEntrega: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: [true, 'No se especifico un usuario']
    }
});

var pedidos = mongoose.model("pedidos", modelSchema);
module.exports = pedidos;