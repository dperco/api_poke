const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },

   image:{
     type: DataTypes.STRING,
     allowNull:false
     
   },

   lifes:{
     type:DataTypes.INTEGER
   },

  attack:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  
  defense:{
    type:DataTypes.INTEGER
  },
  speed:{
     type:DataTypes.INTEGER
  },

  height:{
     type:DataTypes.INTEGER
  },
  weight:{
    type:DataTypes.INTEGER
  },
  type:{
    type:DataTypes.ARRAY(DataTypes.STRING),
    
  },
  createDb:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true
  },
  
 

  },
  {timestamps:false},
  {freezeTableName:true,}
  );

  
 };
