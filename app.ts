import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './src/routes/index.r';
import PostgreSQL from './src/config/postgresql';

const port = process.env.PORT || 3001;
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());
app.use(express.static('storage'));
app.use('/api', router);
app.use((error: any, req: any, res: any) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'An unexpected error occurred',
  });
});

PostgreSQL.getInstance()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port} 🚀`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize the database:', error);
    process.exit(1);
  });
