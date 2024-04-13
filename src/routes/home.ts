import { FastifyInstance } from "fastify";
import { prisma } from "./../config/prisma";
import { z } from "zod";
import { auth } from "./middlewares/auth";

export async function home(app: FastifyInstance) {
  app.get("/home", { preHandler: auth }, async (request, reply) => {
    const requestCookieSchema = z.object({
      userId: z.string(),
    });

    const { userId } = requestCookieSchema.parse(request.cookies);

    const users = await prisma.user.findMany();
    const authUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return reply.status(200).send({ authUser, users });
  });
}
