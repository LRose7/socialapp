const express =require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();

// routes
const authRoute = require('./routes/auth.js'); 
// import UserRoute from './routes/UserRoute.js'
// import PostRoute from './routes/PostRoute.js'
// import UploadRoute from './routes/UploadRoute.js'
// import ChatRoute from './routes/ChatRoute.js'
// import MessageRoute from './routes/MessageRoute.js'


// set up express app
const app = express(); 

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

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
// app.use('/user', UserRoute)
// app.use('/posts', PostRoute)
// app.use('/upload', UploadRoute)
// app.use('/chat', ChatRoute)
// app.use('/message', MessageRoute)