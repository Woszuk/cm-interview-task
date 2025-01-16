import { appConfig } from "src/config/app-config";
import { connectToDatabase } from "src/database/mongo-connection";
import { createServer } from "src/server";

const application = async () => {
  const { PORT, DB_URL } = appConfig;

  await connectToDatabase(DB_URL);

  const app = createServer();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

application();
