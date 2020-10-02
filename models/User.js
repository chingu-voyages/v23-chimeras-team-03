import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { bcrypt } from 'bcrypt;'
import {Photo} from './Photo';
import {Recipe} from './Recipe';
import {ShoppingList} from './ShoppingList';


const passwordRegex = new RegExp(`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`,'gm');

class User extends Model{

};


User.init({
    username:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    registrationDate : {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    password: {
        type: DataTypes.VIRTUAL,
        is: passwordRegex,
        set(password) {
            this.setDataValue('password',password)
            bcrypt.hash(this.password, 8, function(err, hash){
                this.setDataValue('hashedPassword',hash);
            } )
        }

    },
    hashedPassword: {
        type: DataTypes.STRING
    },
    static async validatePassword(password){
        return bcrypt.compare(password, this.hashedPassword, (err, result)=>{
            return result;
        })
    }

}, {
    sequelize,
    modelName: 'User'
    
});

//define shape of our 'User' data

User.hasOne(Photo);
User.belongsTo(Photo, {as:"ProfilePhoto", constraints: false});
User.hasMany(Recipe);
User.belongsToMany(Recipe);
User.hasMany(ShoppingList);
User.belongsTo(ShoppingList);

//build data associations between our models


module.exports = User;