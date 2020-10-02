import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/sequelize';
import moment, { ISO_8601 } from 'moment';
import {User} from './User';

class Recipe extends Model {}

Recipe.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        let date = this.getDataValue('date');
        return moment(date, 'MM/dd/yyyy');
      },
      set(dateString) {
        let parsedDate = moment(dateString, ISO_8601);
        this.setDataValue('date', parsedDate);
      },
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cuisineStyle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Recipe',
  }
);

//define shape of our 'Recipe' model (this will be refactored to fit our API data later, temporary)

Recipe.hasMany(User);
Recipe.belongsToMany(User);
//define associatons to 'User' model

module.exports = Recipe;