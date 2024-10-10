import Joi, { object } from "joi";

export default object({
  priority: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDated: Joi.string().required(),
});
