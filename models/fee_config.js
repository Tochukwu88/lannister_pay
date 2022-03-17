'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fee_config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      
    }
  };
  Fee_config.init({
    fee_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fee_currency:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    Fee_locale:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Fee_entity:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Fee_type:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Fee_value:{
      type: DataTypes.STRING,
      allowNull: false
    },
    // entity_property:{
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }

  },
   {
    sequelize,
    modelName: 'Fee_config',
  },{
    indexes: [
        {
            unique: false,
            fields: ['Fee_locale', 'Fee_entity']
        }
    ]
});
  return Fee_config;
};
