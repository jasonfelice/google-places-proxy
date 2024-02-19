const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());

app.use(cors());

app.get('/places', async (req, res) => {
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

app.get('/details', async (req, res) => {
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

app.listen(8080, () => {

});
