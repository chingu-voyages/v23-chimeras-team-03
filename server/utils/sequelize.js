import  Sequelize  from 'sequelize';





const sequelize = new Sequelize('postgres', 'postgres', 'mypass', { 
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
  });


  //initialize our sequelize connection

  export default sequelize;

