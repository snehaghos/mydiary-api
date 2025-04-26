const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello!');
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
