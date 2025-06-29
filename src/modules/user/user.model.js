import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";



const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        min: 3,
        max: 100,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "{VALUE} is not a valid email."],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function (value) {
                return validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                });
            },
            message: 'Password must include uppercase, lowercase, number, and special character',
        },
    },
    photoURL: {
        type: String,
        required: [true, 'Photo URL is required'],
        trim: true,
        // validate: {
        //     validator: function (value) {
        //         return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i.test(value);
        //     },
        //     message: props => `${props.value} is not a valid image URL`
        // }
    }

}, {
    versionKey: false,
    timestamps: true,
})



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // 🔐 only hash if password was modified

    this.password = await bcrypt.hash(this.password, 10);
    next();
});


export const User = model("User", userSchema)