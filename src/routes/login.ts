import { prisma } from "./../config/prisma";
import { ZodError, z } from "zod";
import { FastifyInstance } from "fastify";
import mailService from "./../services/email-sender-service";

export async function login(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const loginBodySchema = z.object({
      email: z.string().email(),
      name: z.string(),
    });

    const { name, email } = loginBodySchema.parse(request.body);

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        const user = await prisma.user.create({
          data: {
            name,
            email,
          },
        });
      }

      const token = app.jwt.sign(
        { userId: user?.id },
        {
          expiresIn: "1h",
        }
      );

      await mailService.sendMail({
        to: {
          name,
          address: email,
        },
        from: {
          name: "Testing",
          address: "testing@myapp.com",
        },
        subject: "Your system's access.",
        html: `<a href='${token}' target='_blank'>Finish Logging-in</a>`,
      });

      return reply
        .status(200)
        .send({ message: "Check your email to finish the register." });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return reply.status(401).send(error.errors);
      }

      console.error(error);
      return reply.status(500).send({ message: "Internal server error." });
    }
  });
}
