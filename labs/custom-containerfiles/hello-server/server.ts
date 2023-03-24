import Fastify from "fastify";

const server = Fastify({});
const port = process.env.SERVER_PORT ?? 3000;

server.get("/greet", async () => {
  return { hello: "world" };
});

(async () => {
  try {
    await server.listen(port, "0.0.0.0");
    console.log(`server started on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
