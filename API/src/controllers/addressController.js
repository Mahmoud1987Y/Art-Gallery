const { Address } = require("../models/Address");
const { Users } = require("../models/Users");
const { validate } = require("../helper/validation");
const { Op } = require("sequelize");

// Get all addresses for a user
exports.getAddresses = async (req, res, next) => {
  const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
  try {
    const addresses = await Address.findAll({
      where: { user_id: userId },
    });

    res.status(200).json({
      status: "OK",
      data: addresses,
      error: {},
    });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
};

// Add a new address
exports.addAddress = async (req, res, next) => {
  const data = req.body;
  console.log("data")
  console.log(data)
  console.log(req.user)
  // Check validation for req.body
  const validateData = await validate(data);
  if (validateData.error) {
    return res.status(400).send(validateData.error.details[0].message);
  }

  try {
    const userId = req.user.user_data.id; 

    // Create new address data object
    const newAddress = {
      ...data,
      user_id: userId, // Associate address with user
    };
   
   delete newAddress.fullName;
   delete newAddress.email
   
    const createdAddress = await Address.create(newAddress);

    res.status(201).json({
      message: "Address added successfully",
      result: createdAddress,
      error: {},
    });
  } catch (error) {
    console.log(error)
    next(error); // Handle database insertion error
    
  }
};

// Update an existing address
exports.updateAddress = async (req, res, next) => {
  const addressId = req.params.id; // Get address ID from the request parameters
  const data = req.body;

  // Check validation for req.body
  const validateData = await validate(data);
  if (validateData.error) {
    return res.status(400).send(validateData.error.details[0].message);
  }

  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication

    // Check if the address belongs to the user
    const address = await Address.findOne({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update address
    await Addresses.Address(data, { where: { id: addressId } });

    res.status(200).json({
      message: "Address updated successfully",
      error: {},
    });
  } catch (error) {
    next(error); // Handle general error
  }
};

// Delete an address
exports.deleteAddress = async (req, res, next) => {
  const addressId = req.params.id; // Get address ID from the request parameters
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication

    // Check if the address belongs to the user
    const address = await Address.findOne({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Delete address
    await Address.destroy({ where: { id: addressId } });

    res.status(200).json({
      message: "Address deleted successfully",
      error: {},
    });
  } catch (error) {
    next(error); // Handle general error
  }
};
