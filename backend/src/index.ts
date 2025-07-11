import express from "express";
import db from "../models";
import templateRoutes from "./routes/template.routes";
import campaignRoutes from "./routes/campaign.routes";
import sectionRoutes from "./routes/section.routes";
import productRoutes from "./routes/product.routes";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/templates", templateRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
