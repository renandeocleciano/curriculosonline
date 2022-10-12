import express from "express";
import { loadControllers } from "awilix-express";
import { loadContainer } from "./api/infra/container";
import dotenv from "dotenv";
import { errorHandler } from "./api/infra/handlers/error-handler";
import { connect } from "./api/infra/database/mongoose";
import { SessionsModule } from "./api/infra/database/session";
import { ICustomRequest } from "./api/domain/interfaces/request.interface";

dotenv.config();
connect();
const app: express.Application = express();
const port = process.env.PORT;

new SessionsModule().config(app);

app.use(express.json());
loadContainer(app);

app.use(loadControllers("api/controllers/*.js", { cwd: __dirname }));
app.use(errorHandler);

app.use(function (req: ICustomRequest, res: any, next: any) {
  res.locals.session = req.session;
  next();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
