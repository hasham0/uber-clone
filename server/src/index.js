import http from "http";
import app from "./app.js";
import connectToDB from "./configuration/db.config.js";

const serverPort = process.env.PORT || 3000;

const server = http.createServer(app);

/* database connection and app listen to port */
(async () =>
    connectToDB().then((resolve) => {
        try {
            server.listen(serverPort, () => {
                const { port } = resolve.connection;
                console.log(`db connect at port ${port}`);
                console.log(`app working => ${serverPort}`);
            });
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }))();
