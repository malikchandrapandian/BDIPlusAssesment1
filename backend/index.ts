// index.ts
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        res.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Handle specific API errors
            res.status(error.response.status).json({ error: error.response.data.message });
        } else {
            // Handle other errors
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
