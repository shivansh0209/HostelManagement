import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log('Connected to datbase at host:', connectionInstance.connection.host);
    }
    catch(err){
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    finally{
        console.log('ConnectDB finally block executed');
    }
}

export default connectDB;