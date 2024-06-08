const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const MONGO_URI = 'mongodb+srv://cabeysinghe16:chamudi@serpentsleuth.pfcl4bq.mongodb.net/?retryWrites=true&w=majority&appName=SerpentSleuth';
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/snake-logs', require('./routes/snakeLogRoutes'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
