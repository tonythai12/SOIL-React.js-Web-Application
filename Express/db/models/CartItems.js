module.exports = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems', {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ShoppingCart',
          key: 'cart_id'
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'product_id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      }
    }, {
      tableName: 'CartItems',
      timestamps: false
    });
  
    return CartItems;
  };
  