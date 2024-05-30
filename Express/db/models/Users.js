module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'Users',
      timestamps: true // Assumes createdAt and updatedAt fields
    });
  
    return Users;
  };
  