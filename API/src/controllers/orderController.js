const { error } = require("winston");
/* const { Order } = require("../models/Order"); */
/* const { Products } = require("../models/Product");
const{Address} = require('../models/Address') */
const { Order, Product, Users, Address } = require("../models"); // Import your models
exports.addOrder = async (req, res) => {
  console.log("back");

  const data = req.body;
  const userId = req.user.user_data.id;

  const itemsData = [];
  data.orderItems.items.map((item) => {
    itemsData.push({
      UserId: userId,
      AddressId: req.body.addressId,
      ProductId: item.cartLength.id,
      quantity: 1,
      status: "Pending",
    });
  });
  console.log(itemsData);
  try {
    const result = await Order.bulkCreate(itemsData);
    res.status(200).json({
      message: "order added",

      error: {},
    });
  } catch (error) {
    throw new Error("cannot add your orders");
  }
};
exports.getOrdersByUserId = async (req, res) => {
  const userId = req.user.user_data.id;

  try {
    const orders = await Order.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Product,
          attributes: ["title", "description", "price", "img_url"],
        },
        {
          model: Address,
          attributes: [
            "address",
            "city",

            "postalCode",
            "country",
            "phoneNumber",
          ],
        },
      ],
    });
    console.log(orders);

    res.status(200).json({ message: "ok", result: orders, error: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "cannot get orders" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          attributes: ["title", "description", "price", "img_url"],
        },
        {
          model: Users, // Ensure this is the correct model name (e.g., User instead of Users)
          attributes: ["first_name", "last_name", "email"], // Adjust attributes as needed
        },
        {
          model: Address,
          attributes: [
            "address",
            "city",
            "postalCode",
            "country",
            "phoneNumber",
          ],
        },
      ],
    });

    // Optional: If you want to transform the data before sending it back
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      UserId: order.UserId,
      ProductId: order.ProductId,
      AddressId: order.AddressId,
      status: order.status,
      quantity: order.quantity,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      Product: {
        title: order.Product.title,
        description: order.Product.description,
        price: order.Product.price,
        img_url: order.Product.img_url,
      },
      Address: {
        address: order.Address.address,
        city: order.Address.city,
        postalCode: order.Address.postalCode,
        country: order.Address.country,
        phoneNumber: order.Address.phoneNumber,
      },
      Users: {
        first_name: order.User.first_name,
        last_name: order.User.last_name,
        first_name: order.User.first_name,
      },
    }));

    console.log(formattedOrders); // Log the formatted orders

    res.status(200).json({ message: "ok", result: formattedOrders });
  } catch (error) {
    console.error(error); // Use console.error for errors
    res
      .status(500)
      .json({ message: "Cannot get orders", error: error.message });
  }
};
