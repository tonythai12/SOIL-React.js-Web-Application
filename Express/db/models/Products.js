module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'Products',
      timestamps: false
    });
  
    return Products;
  };
  