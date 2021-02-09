import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "./context";
import { SECRET_KEY } from '../Utils/Constants';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
    console.log('context', context);
    const authorization = context.req.headers["authorization"];
    console.log(authorization);
    if (!authorization) {
        throw new Error("Not authenticated");
    }
    console.log('authorization', authorization);
    // Set Bearer
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, SECRET_KEY);
        console.log(payload);
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error("Not authenticated Exception");
    }
    return next();
};