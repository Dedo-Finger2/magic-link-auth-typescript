import { env } from "./config/env";
import { app } from "./config/app";

import { login, verify } from "./routes/index";

app.register(login, { prefix: "/api/" });
app.register(verify, { prefix: "/api/" });

app
  .listen({ port: env.PORT })
  .then(() => console.log(`Running... http://localhost:${env.PORT}`));
