import Joi from 'joi';

export default {
    DEFAULT: Joi.string(),
    EMAIL: Joi.string().email(),
    NAME: Joi.string().min(2).max(100),
    PASSWORD: Joi.string().min(6).max(30)
}