import fastify from "fastify";
import jwt from "@fastify/jwt";

const app = fastify();

app.register(jwt, {
  secret: "jhGdoGd-soLh",
});

export { app };
