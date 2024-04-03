import mongoose from 'mongoose' 

const create_connection=()=>{
    console.log(process.env.MONGODB_URL);
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("mongo connect");
    }).catch((err)=>{
        console.log(err);
    })
}
export default create_connection