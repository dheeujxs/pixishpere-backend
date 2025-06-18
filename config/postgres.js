
const {Sequelize} = require('sequelize')

require('dotenv').config(); 




const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect:'postgres',
        port:process.env.PG_PORT,
        logging:false
    }
);

    console.log('PG_PASSWORD type:', typeof process.env.PG_PASSWORD);
               console.log('🧪 Loaded PG_PASSWORD:', process.env.PG_PASSWORD);


const connectPostgres = async () => {
    try{
        await sequelize.authenticate();
    
        console.log("postgres SQL conntected");

        await sequelize.sync({alter:true});
        console.log("Databasr synced with models");
        
 

        
    } catch(err){
        console.log('PpstgresSql connection error:' , err.message);
        process.exit(1);
        
    }
}

module.exports = {sequelize, connectPostgres};