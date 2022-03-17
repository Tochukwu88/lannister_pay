
 exports.internalResponse=(status = true, data, statusCode = 200, message = "success") => {
  return {
      status,
      statusCode,
      message,
      data
  }
}


exports.errorResponse = (res, message = 'unsuccessful', status = 400) => {
  return res.status(status).json({
    
   
      error: message
  })
}

