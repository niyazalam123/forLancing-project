import mongoose, { Schema, Document } from "mongoose";

// when we use interface for schema then we have "extends Document",we declare type of messageschema model
export interface Message extends Document {
    content: string;
    createdAt: Date;
}


// we have defined messageSchema Model here "Schema<Message>" we have used this to notify that this model is type of this interface
const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, "content is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})




// now we define user schema model

// user schema model typescript interface  "extends Document" this is required when we use interface for schema model
export interface User extends Document {
    userName: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isExceptingMessage: boolean;
    messages: Message[],
    createdAt:Date
}


// user schema model 
const userSchema: Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "UserName is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please add a valid email address'
        ]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verifyCode:{
        type:String,
        required:[true,"Verify Code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify Code Expiry is required"]
    },
    isExceptingMessage:{
        type:Boolean,
        required:[true,"Is Excepting Message is required"],
        default:true
    },
    messages:[messageSchema],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

// nextjs run in edge time , means next js has no idea that this model is already created or new model that's why we have write this model code

const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema)

// (mongoose.models.User as mongoose.Model<User>)  this is for if already exist then return this 

// mongoose.model<User>("User",userSchema)  this is for if already not exist then creat new

export default userModel


// this schema is for mongodb