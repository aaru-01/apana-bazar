import express, { query } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

import User from "./models/User.js";
import Product from "./models/Product.js";


const app = express();
app.use(express.json());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log(`MONGODB Connected`);
    }
};


// POST / signup

app.post('/signup', async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender: gender
    });

    try {
        const savedUser = await user.save();

        res.json({
            sucess: true,
            data: savedUser,
            message: "Signup Sucessfully.."
        })
    }
    catch (e) {
        res.json({
            sucess: false,
            message: e.message
        })
    }
})

// POST / login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: true,
            message: "Please provide email and password"
        })
    }
    const user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")

    if (user) {
        return res.json({
            success: true,
            data: user,
            message: "Login Sucessful"
        })
    } else {
        return res.json({
            success: false,
            message: "Invalid credentials"
        });
    }
});


// GET/products

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json({
        success: true,
        data: products,
        message: "Products fetch Sucessfully.."
    })
});

// POST/product
app.post('/product', async (req, res) => {
    const { name, description, price, image, category, brand, } = req.body;

    const product = new Product({
        name: name,
        description: description,
        price: price,
        image: image,
        category: category,
        brand: brand
    });

    try {
        const saveProducts = await product.save();

        res.json({
            sucess: true,
            data: saveProducts,
            message: "Product created Sucessfully"
        });
    }
    catch (e) {
        res.json({
            sucess: false,
            message: e.message
        });
    }
});
// GET/product/:id

app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.json({
        success: true,
        data: product,
        message: "Product fetched Sucessfully.."
    });
});
// PUT/product/:id

app.put('/product/:id', async (req, res) => {
    const { id } = req.params;

    const {
        name,
        description,
        price,
        image,
        category,
        brand,

    } = req.body;

    await Product.updateOne({ _id: id }, {
        $set: {
            name: name,
            description: description,
            price: price,
            image: image,
            category: category,
            brand: brand,
        }
    });

    const updatedProduct = await Product.findById(id);

    res.json({
        success: true,
        data: updatedProduct,
        message: "Product Updated Successfully.."
    });

});

// DELETE/ product/:id
app.delete('/product/:id',async (req,res)=>{
const { id } = params;


await Product.deleteOne({_id:id});
res.json({
    success: true,
        message: "Product deleted Sucessfully.."
});
});

// GET / products/search?query=samsang
app.get('/products/search', async (req, res)=>{
const { q } = req.query;

const products = await Product.find({name: {$regex: q, $options: "i"} });
res.json({
    success: true,
        data: products,
        message: "Product fetched Sucessfully.."
})

})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
    connectDB();
});