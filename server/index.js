const express =require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();

// routes
const authRoute = require('./routes/auth.js'); 
const userRoute = require('./routes/user.js');
const postRoute = require('./routes/posts.js');
const uploadRoute = require('./routes/uploads.js');
const chatRoute = require('./routes/chat.js');
const messageRoute = require('./routes/message.js');

// set up express app
const app = express(); 

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

// Connect to MongoDB
const CONNECTION=process.env.MONGODB_CONNECTION;
mongoose.connect(CONNECTION, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB Connection Established"))
  .catch(error => console.error("MongoDB Connection Failed: ", error.message));


app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/posts', postRoute);
app.use('/uploads', uploadRoute);
app.use('/chat', chatRoute);
app.use('/message', messageRoute);