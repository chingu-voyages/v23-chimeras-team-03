


async function syncModels(sequelize){
    try{
        await sequelize.sync();
        console.log("models synced to DB")
    }
    catch(error){
        console.log(error);
    }
};

//sync all models to db (create tables if they dont already exist)

export default syncModels;