<<<<<<< HEAD
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('types', {  
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

   
    
  },
  {timestamps:false},
  {freezeTableName:true,}
  );
};
=======
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('types', {  
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

   
    
  },
  {timestamps:false},
  {freezeTableName:true,}
  );
};
>>>>>>> 3cadda75dab77794d71551233c870a59e1ed72e1
