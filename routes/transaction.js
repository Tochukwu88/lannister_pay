const express = require('express')
const Transaction = require('../controllers/transactionController')



const router = express.Router()


router.post("/compute-transaction-fee",Transaction.compute )




module.exports = router


