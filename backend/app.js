const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const assessmentRoutes = require('./routes/assessmentRoutes'); 
const app = express();


app.use(cors());
app.use(express.json()); 

app.use('/api/users', userRoutes);  
app.use('/api/assessments', assessmentRoutes);  

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
