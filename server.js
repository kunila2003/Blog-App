const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// env config
dotenv.config()

// router import
const UserRoutes = require('./routes/UserRoutes')
const BlogRoutes = require('./routes/BlogRoutes')


// mongodb connection
connectDB();
// rest object
const app = express()

//middlewares 
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/blog', BlogRoutes);


//Port 
const PORT = process.env.PORT || 8080

//Listen 
app.listen(8080, () => {

     console.log(`Server running on ${process.env.DEV_MODE} mode  port ${PORT}`.bgCyan.white);
})