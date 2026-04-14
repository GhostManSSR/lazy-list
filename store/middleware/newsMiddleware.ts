import { Middleware } from "@reduxjs/toolkit";

export const newsMiddleware: Middleware = (store) => (next) => (action) => {

    return next(action);
};
