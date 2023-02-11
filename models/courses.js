//import { Schema, model, models, mongoose } from 'mongoose';
const mongoose = require('mongoose');
//import mongoosePaginate from 'mongoose-paginate-v2';
const mongoosePaginate = require('mongoose-paginate-v2');
const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'complete title is mandatory'],
      minlength: [3, 'complete name must have at least 3 characters'],
      maxlength: [99, 'complete name must be shorter than 99 characters'],
    },
    description: {
        type: String,
        required: [true, 'Complete the description'],
        minlength: [3,'complete description must have at least 3 characters'],
        maxlength: [500, 'complete description must be shorter than 500 characters'],
    },
    usersIds: {
        type: Array,
        default : [],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    quotes: {
        type: Number,
        required: [true,'quotes is required'],
    },
    duration:{
      type:String,
      required:[true,'duration is required']
    },
    initialDate:{
      type: String, // hay que cambiar a date
      required:[true, 'Initial data is required']
    }
    
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(mongoosePaginate);

module.exports =  mongoose.models.Courses || mongoose.model('Courses', userSchema);