const { Order } = require('./Order');   // Assuming this is the Order model
const { Users } = require('./Users');
const { Product } = require('./Product');
const { Address } = require('./Address');

// Define associations
Users.hasMany(Order, { foreignKey: 'UserId' });
Order.belongsTo(Users, { foreignKey: 'UserId' });

Product.hasMany(Order, { foreignKey: 'ProductId' });
Order.belongsTo(Product, { foreignKey: 'ProductId' });

Address.hasMany(Order, { foreignKey: 'AddressId' });
Order.belongsTo(Address, { foreignKey: 'AddressId' });

module.exports = {
    Users,
    Product,
    Address,
    Order,
  };