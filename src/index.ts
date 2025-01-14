import app from "src/app";
import { appConfig } from "src/config/appConfig";

const PORT = appConfig.port || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
