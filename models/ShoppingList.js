import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/sequelize';
import {User} from './User';


class ShoppingList extends Model{};


ShoppingList.init({
    ingredients:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    estimatedCost:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    ownerName:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName:"ShoppingList"
});

//define shape of our 'ShoppingList' model

ShoppingList.belongsTo(User);
//define associations to 'User' model


module.exports = ShoppingList;