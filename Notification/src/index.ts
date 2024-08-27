import express from "express";

import { PORT } from "./utils/dotenvVariables";
import routes from "./router/index";
import {sendEmail} from './controllers/sendmail'

const app = express();
app.use(express.json());

app.use(`/api`, routes);
sendEmail()

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
