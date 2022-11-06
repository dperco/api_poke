const { Router } = require('express');
const {Pokemons,Types}=require('../db');
const {Op}=require('sequelize');
const router = Router();
const axios = require('axios');
              
function cap(s){

    return s&&s[0].toUpperCase() + s.slice(1);

};    

router.get('/',async(req,res,next)=>{
    try{
        const check=await Types.findAll();
        //console.log('hola');
        if(check.lenght > 0) {
            const mapedTypes=check.map(type=>type.name);
            return res.send(mapedTypes)
        }else{
            const apiTypes= await axios.get("https://pokeapi.co/api/v2/type/");
           // console.log(apiTypes.data);
            const pokeTypes= apiTypes.data.results.map(type=>{
                return {
                     name: cap(type.name) 
                }
            });
        
        const loadPokeTypes= await Types.bulkCreate(pokeTypes);
        const mapedTypes=loadPokeTypes.map(type=>type.name);
        return res.send(mapedTypes);
        }

    }catch(error){next(error)}
});
  
module.exports = router;