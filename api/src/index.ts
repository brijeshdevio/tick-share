import { env } from "./config";
import { app } from "./app";

const PORT = env.PORT;

function bootstrap() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

const isDev = env.NODE_ENV === "development";
if (isDev) {
  bootstrap();
}

export default app;
