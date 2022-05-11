import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 2999;

// Client Details
const OAUTH_CLIENT_ID = 'TEST_CLIENT'
const OAUTH_SECRET = 'SecreT'
const OAUTH_REDIRECT_URI = 'http://localhost:2999/cb'
const OAUTH_SERVICE_URL = 'http://localhost:3004' //'https:/auth.cloud.ysds.com' 

app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
  res.render('index');
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

  // Authenticate with OAuth
  axios.post(`${OAUTH_SERVICE_URL}/oauth/token?code=${code}&grant_type=code&redirect_uri=${OAUTH_REDIRECT_URI}&client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_SECRET}`).then(response => {
    res.render('signed-in', {
      data: JSON.stringify(response.data, null, "\t")
    });
  }).catch(error => {
    console.log(error.response);
    
    res.render('auth-failed');
  });  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});