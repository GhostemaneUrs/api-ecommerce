import 'dotenv/config';
import cors from 'cors';

import express from 'express';
import router from './src/routes/index.r';
import PostgreSQL from './src/config/postgresql';

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

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
