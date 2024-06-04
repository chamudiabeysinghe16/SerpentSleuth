const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Environment variables (replace with your values)
const MONGO_URI = 'mongodb+srv://cabeysinghe16:chamudi@serpentsleuth.pfcl4bq.mongodb.net/?retryWrites=true&w=majority&appName=SerpentSleuth';
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// DB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
