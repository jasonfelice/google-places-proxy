const express = require('express');
const cors = require('cors');
const axios = require('axios');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use(cors());

router.get('/places', async (req, res) => {
  try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
        params: req.query,
      });
      res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        throw new Error(error);
    }
});

router.get('/details', async (req, res) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: req.query,
        });
        res.json(response.data);
      } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
          throw new Error(error);
      }
  });

app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);
