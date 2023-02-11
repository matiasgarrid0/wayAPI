const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const conn = {
    isConnected: false,
};

module.exports = async function dbConnect(){
    const db = await mongoose.connect(process.env.MONGODB_URI);
    conn.isConnected = db.connections[0].readyState;
}

mongoose.connection.on('error',(err)=>{
    console.log(err);
})