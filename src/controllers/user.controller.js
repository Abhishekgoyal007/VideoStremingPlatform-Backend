//if i want to register the user for the usre then i have to follow the following steps 
// at first i need to show the frontend part to the user 
// then i have to take the data from the user
// then i have to validate the data
// then i have to save the data to the database
// then i have to send the response to the user
// As a response i have to redirect the user to the home page mostly or to their profile 

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async(req, res, next) => {
    
    const { fullName, email, username, password } = req.body 
    console.log("fullName: ", fullName);
    console.log("email: ", email);
    console.log("username: ", username);
    console.log("password: ", password);

    if(
        [fullName, email, username, password].some((field) =>
        field?.trim() === "") 
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({$or: [{ email }, { username }]})

    if( existedUser ) {
        throw new ApiError(409, "User already exists")
    }

    const avtarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avtarLocalPath) {
        throw new ApiError(400, "Avtar file is required");
    }

    const avtar = await uploadOnCloudinary(avtarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);   

    if(!avtar) { 
        throw new ApiError(400, "Avtar file is required");
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avtar: avtar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(new ApiResponse(200, "User registered successfully", createdUser))

} )

export { registerUser }