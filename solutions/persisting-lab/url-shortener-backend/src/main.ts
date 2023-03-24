import express from "express";
import uniqid from "uniqid";
import urlModel from "./urlModel";
import sequelize from "./connection";
import cors from "cors";

const app = express();
const HTTP_PORT = process.env.HTTP_PORT ?? 8080;
const API_HOST = process.env.API_HOST ?? "localhost";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Established");
    urlModel
      .sync()
      .then(() => {
        console.log("UrlMapping table created");
      })
      .catch((err: Error) => {
        console.error(`Error while creating UrlMapping table ${err}`);
      });
  })
  .catch((err: Error) => {
    console.error(`Error while connecting to db ${err}`);
  });

app.post("/api/longurl", async (req, res) => {
  const { url } = req.body ;
  const urlWithoutProtocol = removeProtocol(url as string);
  const id = uniqid();
  try {
    const newUrl = await urlModel.create({ long_url: urlWithoutProtocol, short_url: id });
    console.log(`stored ${id} --> ${url}`);
    res.status(201).send({
      message: `http://${API_HOST}:${HTTP_PORT}/api/shorturl/${newUrl.dataValues.short_url}`,
      type: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      message: "An error was encountered! Please try again.",
      type: "failure"
    });
  }
});

app.get("/ping", (_, res) => {
  console.log("Received a ping request")
  res.status(200).send({
    message: "pong",
    type: "success"
  })
})

app.get("/api/shorturl/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const urlResult = await urlModel.findOne({
      attributes: ["long_url"],
      where: {
        short_url: id,
      },
    });
    const long_url = urlResult.dataValues.long_url;
    console.log(`redirecting user from ${id} to ${long_url}`)
    res.status(302).redirect("http://"+long_url);
  } catch (err) {
    const message = {
      message: "Error while fetching original url",
      type: "Internal error"
    };
    console.error(`${message.message} - ${err}`);
    res.status(500).send(message);
  }
});

function removeProtocol(url: string){
  if(url.startsWith("http")){
    return url.replace(/^https?:\/\//, '');
  } else {
    return url;
  }
}

app.listen(HTTP_PORT, () => {
  console.log(`App listening on port ${HTTP_PORT}`);
});
