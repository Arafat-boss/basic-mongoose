import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;
const PORT = 5000;

async function main() {
   try {
      //==================connect to mongoose========================
     await mongoose.connect(`mongodb+srv://noteApp:ME0xoQzMSUwbJICm@cluster0.j4yvqpr.mongodb.net/my-app?retryWrites=true&w=majority&appName=Cluster0`);
     console.log("****connected to Mongoose*****");
        server = app.listen(PORT, ()=>{
            console.log(`App is listening on port ${PORT}`);
        })
   } catch (error) {
        console.log(error);
   }
}

main()