const { Router } = require('express');
const {Pokemons,Types}=require('../db');
const {Op, BOOLEAN}=require('sequelize');
const router = Router();
const axios = require('axios');


function cap(s){

    return s&&s[0].toUpperCase() + s.slice(1);

};   

async function getDbData(){
    try{
       const pokeData=  await Pokemons.findAll({
           include : {
               model:Types,
               attributes:['name'],
               through:{attributes:[],}
           }
       });
       const formateData = pokeData.map(pk=>{
           return {
              id:pk.id,
              name:cap(pk.name),
              types:pk.type,
              image:pk.image,
              lifes:pk.lifes,
              attack:pk.attack,
              defense:pk.defense,
              speed:pk.speed,
              height:pk.height,
              weight:pk.weight
           }
       })
       
       return formateData;
     
    }catch(error){console.log(error)}
};

async function getApiData(){
    const resp= await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
            .then((data)=>{return data.data.results;})
            .then((results)=>{ return Promise.all(results.map((res)=>axios.get(res.url)))})
            .then((data)=>{return data.map((res)=>res.data)});
        //console.log('hola');
        //console.log(resp);
        let pokData= resp.map((result)=>{
            return{
                id:result.id,
                name:cap(result.name),
                types: result.types.map((t)=> cap(t.type.name)),
                image: result.sprites.front_default,
                lifes:result.stats[0].base_stat,
                attack:result.stats[1].base_stat,
                defense:result.stats[2].base_stat,
                speed:result.stats[3].base_stat,
                height:result.height,
                weight:result.weight,

            };
        });
        //console.log(pokData);
    return pokData;

}; 

async function loadPokeData(){
    let pokeApi=await getApiData();
    //console.log(pokeApi);
    let pokedb= await getDbData();
   //console.log(pokedb);
    //let allPokdata=[];
    if (pokeApi && pokedb){
        allPokdata=[...pokeApi,...pokedb];
    }else{
        allPokdata=[...pokeApi];
    }
    //console.log(allPokdata);
  return allPokdata
};

router.get('/',async (req,res,next)=>{
    try{
        //console.log('hola');
        const datapok=await loadPokeData();
       // console.log('hola');
        //console.log(datapok);
        const {name}= req.query;
        if(name){
            const pokem= datapok.filter(p=> p.name.toLowerCase() === name.toLowerCase());
            if(pokem.length === 0){
                
                res.send(datapok)
            }else{
            return res.send(pokem);}
        }else{
            res.send(datapok);
        }
    }catch(error){console.log(error), next(error)}
});

router.get('/:id',async (req,res,next)=>{
      const {id}=req.params;
      const check="-";
      let pokemon;
      try{
         if(id.includes(check)){
             let found=await Pokemons.findByPk(id,{
                 include:{
                     model:Types,
                     attributes:['name'],
                     through:{attributes:[],}
                 }
             });
             //console.log(found);
             pokemon={
                  id:found.dataValues.id,
                  name:found.dataValues.name,
                  image:found.dataValues.image,
                  lifes:found.dataValues.lifes,
                  attack:found.dataValues.attack,
                  defense:found.dataValues.defense,
                  speed:found.dataValues.speed,
                  height:found.dataValues.height,
                  weight:found.dataValues.weight,
                  types:found.dataValues.types.length?found.dataValues.types:found.dataValues.type
             }
             //console.log(pokemon);
         }else{
             const poke=await getApiData();
             const numId=Number(id);
             let found = poke.filter(p=>p.id === numId);
             pokemon=found[0];
         }
        return res.send(pokemon);
      }catch(error){console.log(error),next(error)}

});

router.post('/',async (req,res,next)=>{
    try{
        const{name,image,lifes,attack,defense,speed,height,weight,type,createDb}=req.body;
        let same=[];
        if(same.length === 0){
            let newPokemon= await Pokemons.create({
                
                  name:name,
                  image:image,
                  lifes:lifes,
                  attack:attack,
                  defense:defense,
                  speed:speed,
                  height:height,
                  weight:weight,
                  type:type,
                  createDb:createDb
            });
            const dbTypes=await Types.findAll({
                where:{name: name}
            });
            await newPokemon.addType(dbTypes)
            res.send(`${name} created!`);
        }else{
            res.send(`${name} already created`)
        }


    }catch(error){console.log(error),next(error)}
})


module.exports = router;