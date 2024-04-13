import { FastifyInstance } from "fastify";
import { ZodError, z } from "zod";
import { prisma } from "./../config/prisma";
import {} from "@fastify/jwt";

type DecodedCode = {
  userId: string;
};

export async function verify(app: FastifyInstance) {
  app.get("/verify", async (request, reply) => {
    const requestQuerySchema = z.object({
      token: z.string({ required_error: "Não autorizado." }),
    });

    const { token } = requestQuerySchema.parse(request.query);

    try {
      const decodedToken: DecodedCode = app.jwt.verify(token);

      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.userId,
        },
      });

      if (!user) {
        return reply.status(400).send({ message: "Error." });
      }

      return reply.status(200).send({ message: `Auth as ${user?.name}` });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return reply.status(401).send(error.message);
      }

      // TODO: Mudar isso aqui
      if (error?.code === "FAST_JWT_EXPIRED") {
        return reply.status(400).send({ message: "Token expired." });
      }

      if (error?.code === "FAST_JWT_MALFORMED") {
        return reply.status(401).send({ message: "Not Authorized." });
      }

      console.error(error);
      return reply.status(500).send({ message: "Internal Server Error." });
    }
  });
}
