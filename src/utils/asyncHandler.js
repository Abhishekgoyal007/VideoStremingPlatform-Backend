const asyncHandler = (requestHandler) => {
    (res, req, next) => {
        promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export { asyncHandler }


// here is the 2nd way of doing this things 

// const asyncHandler = ()=>{}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {} this code is written to understand the code below


//So this method is using try catch block 

// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: "fail",
//             message: err.message
//             })
//         }
//     }

