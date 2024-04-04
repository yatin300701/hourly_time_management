import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { dailyHabbit } from './daily-habbit/routes/daily-habbit.route';

const app = express();
const PORT = 4000;

// Middleware
require('dotenv').config();


app.use(bodyParser.json());

// Routes
app.use('/api/daily-habbit',dailyHabbit );

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});