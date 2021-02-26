import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "./context";
import { SECRET_KEY } from '../Utils/Constants';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new Error("Not Authenticated");
    }
    // Set Bearer
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, SECRET_KEY);
        context.payload = payload as any;
    } catch (err) {
        throw new Error("Not Authenticated Exception");
    }
    return next();
};