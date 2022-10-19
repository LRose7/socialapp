if (process.env.NODE_ENV = 'production') {
    require('dotenv').config();
}
const express = require('express');

// set up express app
const app = express(); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
