import sequelize from './connection';
import { DataTypes } from 'sequelize';

const URL = sequelize.define('Url', {
  // Model attributes are defined here
  long_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  short_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'UrlMapping'
});

export default URL;