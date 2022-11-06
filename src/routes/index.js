const { Router } = require('express');

const pokeRouter = require ('./pokemon');
const typeRouter= require ('./type');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons',pokeRouter);
router.use('/types',typeRouter);




module.exports = router;
 