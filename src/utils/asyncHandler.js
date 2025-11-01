const asyncHandler = (func)=> {
    return (req,res,next) =>{
        Promise.resolve(
            func(req,res,next)
        ).catch((error)=>{
            next(error)
        })
    }
}

// const asyncHandler = (func) => {
//   async  (req, res, next) => {
//         try {
//             await func(req,res,next);        
//         } catch (error) {
//             res.status(error.code || 404).json({
//                 succes: false,
//                 message : error.message
//             })
//         }
//     };
// };

export { asyncHandler };
