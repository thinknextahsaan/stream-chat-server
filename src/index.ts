import "dotenv/config";
import express from "express";
import cors from "cors";
import { StreamClient } from "@stream-io/node-sdk";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/get-stream-token", (req, res) => {
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
        return res.status(404).json({
            message: "Api Key or Secret are missing or invalid!",
        });
    }

    const { userid } = req.body;

    if (!userid) {
        return res.status(404).json({
            message: "User id is required to generate a stream token",
        });
    }

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issuedAt = Math.round(new Date().getTime() / 1000) - 60;

    let client = new StreamClient(apiKey, apiSecret);

    let token = client.createToken(userid, exp, issuedAt);
    console.log("Successfully created token for userid : ", userid);

    return res.status(200).json({
        message: "Token created successfully",
        token,
    });
});

app.all("/*", (req, res) => {
    return res.status(200).json({
        message : "Welcome to our server!"
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
