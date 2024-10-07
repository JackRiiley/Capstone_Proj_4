import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://swapi.dev/api/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.get("/", async (req, res) => {
    // Render the page with an empty name initially
    res.render("index.ejs", { 
        displayData: []  
    });
});

app.get("/get-data", async (req, res) => {
    console.log("Request body: ", req.query);
    const searchId = req.query.id;
    const category = req.query.category;

    // Construct the full URL
    const fullUrl = `${API_URL}${category}/?search=${searchId}`;
    
    // Log the full URL
    console.log("Full URL being requested: ", fullUrl);
    try {
        const result = await axios.get(fullUrl);
        const data = result.data.results; 

        const displayData = data.map(item => ({
            name: item.name || item.title || "Unknown",
            height: item.height || "N/A",
            mass: item.mass || "N/A",
            films: item.films || []
        }))
        res.render("index.ejs", { 
            displayData
        });
    } catch (error) {
        res.status(404).send(error.message)
    }
});

  app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });