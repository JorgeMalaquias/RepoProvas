import joi from "joi";


export const userRegisterSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});