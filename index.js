import bodyParser from "body-parser";
import express from "express";
import userRoutes from "./Routes/users.js";
import { Builder, parseString } from 'xml2js';
import * as cheerio from "cheerio";

//npm install express xml2js cheerio
//npm install --save-dev nodemon

// Initialization
const app = express();
const port = 7000;

app.use(bodyParser.json());//middleware

app.use('/users',userRoutes);

app.use(express.static('./frontend'));


app.get('/', (req, res) =>{
    console.log('TEST');
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/xml-js/1.6.11/xml-js.min.js"></script>
                <script type = "module"  src="/java.js" defer></script>
            </head>
            <body>
                <h1>Welcome to the Frontend Page!</h1>
                <p>This is an example web page generated with Express.</p>
                <button id="fetch-data">Fetch Data</button>
                <button id="post-data">Post Data</button>
                <button id="delete-data">Delete Data</button>
                <input id="deleteId" type ="text" placeholder=""enter Id to delete>
                <div>
                    <input type="text" id="firstName" placeholder="First Name" required>
                    <input type="text" id="lastName" placeholder="Last Name" required>
                    <input type="number" id="age" placeholder="Age" required>
                </div>
                <div>
                    <button id="get-json">Get JSON</button>
                    <button id="get-html">Get HTML</button>
                    <button id="get-xml">Get XML</button>
                </div>
                <div id="data"></div>
                 <div id="output"></div>
                
            </body>
            
            </html>    
    `);
})
// Run app
app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
});


