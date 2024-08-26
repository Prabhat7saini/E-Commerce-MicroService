import express from "express";
import { connect } from "./config/database";
import { PORT } from "./utils/dotenvVariables";
import routes from './routes/index'

// import routes from "./routes";

const app = express();
app.use(express.json());
connect();

app.use(`/api`, routes);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
