//function for add product
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];


        const images = [image1, image2, image3, image4].filter((item) => (
            item !== undefined
        ))
        //using cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })

                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,

            date: Date.now()
        }

        console.log(productData);
        const product = new productModel(productData)
        //saving to the DB
        await product.save()

        res.json({
          success:true,
          message:"Product added successfully"
    
        })
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: err.message
        })
    }

}

//function for list product 
const listProducts = async (req, res) => {
try{
const products  =await productModel.find({});
res.json({
    success:true,
    message:"Product Listed",
    products
})
}catch(err){
    console.log(err);
    res.json({
        success:false,
        message:err.message
    })
}
}

//function for remove product 
const removeProduct = async (req, res) => {
try{
await productModel.findByIdAndDelete(req.body.id);

res.json({
    success:true,
    message:"Product successfully removed",
    
})

}catch(err){
    console.log(err);
    res.json({
        success:false,
        message:err.message
    })
}
}

//function for single  product information 
const singleProduct = async (req, res) => {
try{
    const {productId} = req.body;
    const product = await productModel.findById(productId);

    res.json({
        success:true,
        product
    })
}catch(err){
    console.log(err);
    res.json({
        success:false,
        message:err.message
    })
}
}

//export
export { addProduct, listProducts, removeProduct, singleProduct };