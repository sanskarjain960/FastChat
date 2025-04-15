
import { ApiError } from "../utils/ApiError.js";
const errorHandler = (err,req,res,next) => {
    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({
          success: false,
          statusCode: err.statusCode,
          message: err.message,
        });
      }
      else next(err);
    }    

export default errorHandler;