const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const qrCode = require("qrcode");
const https = require("https");
const fs = require("fs");
const os = require("os");
const certsPath = process.env.CERTS_PATH;
const httpPort = process.env.HTTP_PORT;
const tlsPort = process.env.TLS_PORT;
const user = os.userInfo().username;

if (user === "root") {
  console.error("Root user detected, quitting.");
  process.exit();
}

if (!httpPort) {
  console.error("HTTP PORT not found. Set the env variable to proceed.");
  process.exit();
}

if (!tlsPort) {
  console.error("TLS PORT not found. Set the env variable to proceed.");
  process.exit();
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/convert", async (req, res) => {
  const textInput = req.body.textInput;
  if (textInput.length === 0) {
    res.status(400).send("Error, text is empty");
  }
  try {
    const src = await qrCode.toDataURL(textInput);
    res.render("qr-code", { src });
  } catch (err){
    console.error(err);
    res.status(500).send("Error Occured");
  }
});

function readCertFile(fileName) {
  if (!fs.existsSync(`${certsPath}/${fileName}`)) {
    console.error(`File ${fileName} not found`);
    process.exit();
  }
  return fs.readFileSync(`${certsPath}/${fileName}`, "ascii");
}

const sslServer = https.createServer(
  {
    key: readCertFile("key.pem"),
    cert: readCertFile("cert.pem"),
  },
  app
);

sslServer.listen(tlsPort, () => console.log(`TLS Server running on port ${tlsPort}`));
app.listen(httpPort, () => console.log(`Server running on port  ${httpPort}`));
