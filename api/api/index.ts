import app from "../src/app";
import { env } from "../src/config";

const isDevelopment = env.NODE_ENV === "development";
if (isDevelopment) {
  const PORT = env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
