import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const users = require("./users.json");


const app = express();

const PORT = 3001;

app.get("/api/users", (req, res) => {
    console.log(`user data = ${users}`);
    return res.json(users);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));