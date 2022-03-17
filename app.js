const express = require('express');
const app = express()
const morgan = require('morgan');



const { sequelize } = require('./models/index')
const feesRoutes = require('./routes/fees')
const computeRoutes = require('./routes/transaction.js');
const { errorResponse } = require('./utils/responseHandler');

app.use(morgan('dev'))
require('dotenv').config()


//app.use(express.text())
app.use(express.json())
app.use('/fees',feesRoutes)
app.use('/',computeRoutes)
app.use('*', (req, res) => {
    return errorResponse(res, "route not found", 404)
})


const port = process.env.PORT || 8000
app.listen(port, async () => {
    try {
        console.log('server started')
        await sequelize.authenticate();
       
       
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
})
module.exports = app