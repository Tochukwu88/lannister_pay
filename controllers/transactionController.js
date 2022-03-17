//const { User } = require('../models/index')
const {Fee_config, sequelize} = require('../models/index')
const { QueryTypes } = require('@sequelize/core');


const {  errorResponse } = require('../utils/responseHandler')




class Transaction {
    static async compute(req, res) {
        const payload = req.body
        

        try {
       const responseData =     {
                AppliedFeeID: "",
                AppliedFeeValue: "",
                ChargeAmount: "",
                SettlementAmount: ""
            }
          
            
          

                let Locale 
                if(payload.CurrencyCountry   && payload.PaymentEntity.Country  && payload.CurrencyCountry === payload.PaymentEntity.Country){
                  Locale = 'LOCL'
                }else if(payload.CurrencyCountry   && payload.PaymentEntity.Country  && payload.CurrencyCountry !== payload.PaymentEntity.Country){
                    //internationale INTL
                    Locale ='INTL'
                }else{
                  Locale = '*'
                  }        
                  let config = []
                    
               
                        let entity_proptery = payload.PaymentEntity.Brand
                        if( payload.PaymentEntity.Brand  ){
                                 entity_proptery =payload.PaymentEntity.Brand
                                }else if(payload.PaymentEntity.Issuer  && !payload.PaymentEntity.Brand ){
                                    entity_proptery =payload.PaymentEntity.Issuer
                                }else if(payload.PaymentEntity.ID  && !payload.PaymentEntity.Brand && !payload.PaymentEntity.Issuer){
                                    entity_proptery = payload.PaymentEntity.ID 
                                }else if(payload.PaymentEntity.Number  && !payload.PaymentEntity.Brand && !payload.PaymentEntity.Issuer
                                     && !payload.PaymentEntity.ID){
                                    entity_proptery = payload.PaymentEntity.Number 
                                }else if(payload.PaymentEntity.SixID  && !payload.PaymentEntity.Brand && !payload.PaymentEntity.Issuer  && !payload.PaymentEntity.ID
                                    && !payload.PaymentEntity.Number){
                                    entity_proptery = payload.PaymentEntity.SixID 
                                }
                                let Fee_entity = `${payload.PaymentEntity.Type}(${entity_proptery})`
            //             //find by fee_locale and fee entity
             const a = await sequelize.query(`SELECT  fee_id,  Fee_type,  Fee_value FROM Fee_configs WHERE Fee_entity = '${Fee_entity}' AND Fee_locale = '${Locale}'  AND fee_currency = '${payload.Currency}'  `, { type: QueryTypes.SELECT });
                    config = [...a]
                    if(a.length<1){
                      entity_proptery = '*'
                      Fee_entity = `${payload.PaymentEntity.Type}(${entity_proptery})`
                       //             //find by fee_locale and fee entity
             const b = await sequelize.query(`SELECT  fee_id,  Fee_type,  Fee_value FROM Fee_configs WHERE Fee_entity = '${Fee_entity}' AND Fee_locale = '${Locale}'  AND fee_currency = '${payload.Currency}'  `, { type: QueryTypes.SELECT });
             config = [...b]
                    }
                   if(config < 1){
                    entity_proptery = '*'
                    Fee_entity = `*(${entity_proptery})`
                     //             //find by fee_locale and fee entity
              const c = await sequelize.query(`SELECT  fee_id,  Fee_type,  Fee_value FROM Fee_configs WHERE Fee_entity = '${Fee_entity}' AND Fee_locale = '${Locale}'  AND fee_currency = '${payload.Currency}'  `, { type: QueryTypes.SELECT });
                 config = [...c]

                    }
                    if(config < 1){
                      entity_proptery = '*'
                      Locale = '*'
                      Fee_entity = `*(${entity_proptery})`
                       //             //find by fee_locale and fee entity
                const d = await sequelize.query(`SELECT  fee_id,  Fee_type,  Fee_value FROM Fee_configs WHERE Fee_entity = '${Fee_entity}' AND Fee_locale = '${Locale}'  AND fee_currency = '${payload.Currency}'  `, { type: QueryTypes.SELECT });
                   config = [...d]
  
                      }
                    if(config.length>0){
                      if(config[0].Fee_type === 'PERC'){
                        const result = (Number(config[0].Fee_value) * Number(payload.Amount) ) / 100
                      
                        responseData.ChargeAmount = payload.Customer.BearsFee? Number(payload.Amount) + result:Number(payload.Amount)
                        responseData.AppliedFeeID =config[0].fee_id
                        responseData.AppliedFeeValue= result
                        responseData.SettlementAmount =responseData.ChargeAmount - responseData.AppliedFeeValue
                      }else if(config[0].Fee_type === 'FLAT'){
                        responseData.ChargeAmount = payload.Customer.BearsFee? Number(payload.Amount) + Number(config[0].Fee_value):Number(payload.Amount)
                        responseData.AppliedFeeID =config[0].fee_id
                        responseData.AppliedFeeValue= Number(config[0].Fee_value)
                        responseData.SettlementAmount =responseData.ChargeAmount - responseData.AppliedFeeValue
                      }else{
                          const v = config[0].Fee_value.split(':')
                          const p = v[1]
                          const f = v[0]
                        const result = (Number(p) * Number(payload.Amount) ) / 100
                        responseData.ChargeAmount =payload.Customer.BearsFee? Number(payload.Amount) + Number(f) +result : Number(payload.Amount)
                        responseData.AppliedFeeID =config[0].fee_id
                        responseData.AppliedFeeValue= Number(f) +result
                        responseData.SettlementAmount =responseData.ChargeAmount - responseData.AppliedFeeValue
                      
                      }}
              
                if(config.length <1){
                    return errorResponse(res, "No fee configuration  found for this transaction", 404)
                }

            
           
          return res.status(200).json(responseData)


        } catch (error) {
          
          

            return errorResponse(res, "error occourred, contact support", 500)




        }




    }
   
}
module.exports = Transaction