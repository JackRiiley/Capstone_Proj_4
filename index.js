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
        name: "",
        height: "",
        mass: "",
        films: []    
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
        const data = result.data.results[0]; // Access the first result
        // Extract more information, and handle cases where data may not be found
        const displayName = data ? (data.name || data.title) : "No result found";
        const height = data?.height || "N/A"; // Optional chaining to avoid errors
        const mass = data?.mass || "N/A"; // Optional chaining to avoid errors
        const films = data?.films || []; // Default to an empty array if films are not present

        res.render("index.ejs", { 
            name: displayName,
            height: height,
            mass: mass,
            films: films
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