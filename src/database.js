const mongoose = require('mongoose')

const URI = 'mongodb://localhost/merndb-01'


mongoose.connect(URI, { useNewUrlParser: true })
    .then(res => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error al conectar a la base de datos:', err))

module.exports = mongoose


