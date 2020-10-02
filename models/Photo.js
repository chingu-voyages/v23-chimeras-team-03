import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { User } from './User';


class Photo extends Model{};

Photo.init({
    url:{
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: "Photo"
});

//define shape of our 'Photo' model

Photo.belongsTo(User);
//define association to 'User' model


module.exports = Photo;