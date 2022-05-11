import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 2999;

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/css/main.css', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/css/main.css'));
});

app.get('/cb', (req: Request, res: Response) => {
  const code = req.query.code;

  if (!code) {
    res.send('No code');
    return;
  }

  // Authenticate with code
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});