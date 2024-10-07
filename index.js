import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://swapi.dev/api/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.get("/", async (req, res) => {
    res.render("index.ejs");
})

app.post("/get-data", async (req, res) => {
    const searchId = req.body.id;
    console.log(searchId);
    const category = req.body.category;
    console.log(category);
    try {
        const result = await axios.get(API_URL + category + "/?search=" + searchId);
        console.log(JSON.parse(result));
        res.render("index.ejs", { name: JSON.stringify(result.data.name) });
    } catch (error) {
        res.status(404).send(error.message)
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });