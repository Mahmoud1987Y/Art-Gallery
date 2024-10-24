const { error } = require("winston");
/* const { Order } = require("../models/Order"); */
/* const { Products } = require("../models/Product");
const{Address} = require('../models/Address') */
const { Order, Product, User, Address } = require("../models"); // Import your models
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
    console.log(error);
    throw new Error("cannot add your orders");
  }
};
exports.getOrdersByUserId = async (req, res) => {
  const userId = req.user.user_data.id;
  console.log(userId);
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
