'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Fee_configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
     
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
      
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
    await queryInterface.addIndex('Fee_configs', ['Fee_locale', 'Fee_entity']);

  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Fee_configs');
  }
};