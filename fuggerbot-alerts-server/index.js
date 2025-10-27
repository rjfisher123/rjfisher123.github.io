const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post('/subscribe', (req, res) => {
  const phone = req.body.phone;
  console.log('📲 Opt-in received from:', phone);
  // Save to DB or trigger action here
  res.json({ message: 'Phone number received', phone });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});