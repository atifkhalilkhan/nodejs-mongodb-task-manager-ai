import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true});

UserSchema.pre('save' , async function(){
    if(!this.isModified('password')) return;
    const password = this.password;
    const hashedPassword = await bcrypt.hash(password, 10);
     this.password = hashedPassword;
})



const UserModel = model('User', UserSchema);

export default UserModel;