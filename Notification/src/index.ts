import express from "express";

import { PORT } from "./utils/dotenvVariables";
import routes from "./router/index";

const app = express();
app.use(express.json());

app.use(`/api`, routes);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
