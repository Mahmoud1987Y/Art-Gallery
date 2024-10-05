const Joi = require("joi");

exports.validate = (data = []) => {
  const schemeInputs = {
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .message("enter a valid password must contain only letters and numbers"),
    first_name: Joi.string().min(2).max(30).required().lowercase(),
    last_name: Joi.string().min(2).max(30).required().lowercase(),
    pic_url: Joi.string(),
    date_of_birth: Joi.date().required(),
    role: Joi.string().allow("admin", "customer", "moderator").required(),
    preferred_language: Joi.string().allow("ar", "en").default("en"),
  };
  const targetInput = {};
  for (item in data) {
    if (schemeInputs.hasOwnProperty(item)) {
      targetInput[item] = schemeInputs[item];
    } else {
      targetInput[item] = Joi.any();
    }
  }

  const scheme = Joi.object(targetInput);
  console.log(scheme.validate(data));
  return scheme.validate(data);
};
