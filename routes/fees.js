const express = require('express')
const Fees = require('../controllers/feesController')






const router = express.Router()
router.post("/",Fees.addFee )




module.exports = router


