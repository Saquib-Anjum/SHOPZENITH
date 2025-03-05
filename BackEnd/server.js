import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
//app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB()
connectCloudinary();

//Middlewares
app.use(express.json())
app.use(cors());

//api EndPoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter);

//api testing and connection with port 
app.get('/',(req,res)=>{
res.send("API working")
})
app.listen(PORT,()=>{
    console.log(`Server is  running on address http://localhost:${PORT}`)
})