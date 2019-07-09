const express = require('express');

const app = new express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`)
});