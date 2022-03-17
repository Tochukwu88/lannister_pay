
const express = require('express');
const {Fee_config} = require('../models/index')
const { successRes, errorResponse } = require('../utils/responseHandler');





class Fees {
    static async addFee(req, res) {
        

        try {
            
           const fcs = req.body.FeeConfigurationSpec
           const s = fcs.split('\n')
        ;
     for( let i =0 ; i <s.length;i++){
   
     let singleFcs = s[i].split(' ')
     
    
     const Payload ={
        fee_id:singleFcs[0],
        fee_currency:singleFcs[1],
        Fee_locale:singleFcs[2],
        Fee_entity:singleFcs[3],
        Fee_type:singleFcs[6],
        Fee_value:singleFcs[7],
       
     }
    await Fee_config.create(Payload)

     }
   
    
         return res.status(200).json({status:'ok'})

          


        } catch (error) {
          

            return errorResponse(res, "error occourred, contact support", 500)




        }




    }
   
}
module.exports = Fees