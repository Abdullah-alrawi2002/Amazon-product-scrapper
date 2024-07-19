// Load necessary modules
const express = require('express');
const request = require('request-promise');

// Setup server configuration
const PORT = process.env.PORT || 5000; // Port configuration, defaulting to 5000 if environment variable is not set
const app = express(); // Create a new Express application

// Middleware to parse JSON bodies
app.use(express.json());

// Function to generate API URL for ScraperAPI
const returnScraperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Root route to welcome users
app.get('/', async (req, res) => {
    res.send('Welcome to Amazon Scraper API!');
});

// Route to fetch product details from Amazon
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params; // Extract productId from route parameters
    const { api_key } = req.query; // Extract API key from query parameters

    try {
        // Make a request to the ScraperAPI
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        // Parse the JSON response and send it back to the client
        res.json(JSON.parse(response));
    } catch (error) {
        // Handle errors by sending the error object
        res.json(error);
    }
});

// Route to fetch reviews for a specific product
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Route to fetch offers for a specific product
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Route to search for products on Amazon
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));