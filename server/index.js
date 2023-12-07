import express, { query, response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
import path from "path";

import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

const app = express();
app.use(express.json());

const __dirname = path.resolve();

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


// Products
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
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;


    await Product.deleteOne({ _id: id });
    res.json({
        success: true,
        message: "Product deleted Sucessfully.."
    });
});

// GET / products/search?query=hp {name is pass here}
app.get('/products/search', async (req, res) => {
    const { q } = req.query;

    const products = await Product.find({ name: { $regex: q, $options: "i" } });
    res.json({
        success: true,
        data: products,
        message: "Product fetched Sucessfully.."
    })
})



// Orders

// POST/Order
app.post('/order', async (req, res) => {
    const {
        user,
        product,
        quantity,
        shippingAddress,
        deliveryCharges

    } = req.body;



    const order = new Order({
        user: user,
        product: product,
        quantity: quantity,
        shippingAddress: shippingAddress,
        deliveryCharges: deliveryCharges,
    });



    try {
        const saveOrder = await order.save();
        res.json({
            success: true,
            data: saveOrder,
            message: "Order Created Sucessfully"
        })

    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
});

// GET/Order/:id
app.get('/order/:id', async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id).populate("user product");

    // clean sensitive data
    order.user.password = undefined;
    // order.user.gender = undefined;
    // order.user.address = undefined;
    // order.user.createdAt = undefined;
    // order.user.updatedAt = undefined;

    res.json({
        succes: true,
        data: order,
        message: "Order fetched Successfully.."
    });
});

// GER /orders/user/:id
app.get('/orders/user/:id', async (req, res) => {

    const { id } = req.params;

    const orders = await Order.find({ user: id }).populate('user product')


    // remove password from all the order 
    orders.forEach((order) => {

        order.user.password = undefined
    })

    res.json({
        sucess: true,
        data: orders,
        message: "Orders fetched sucessfully.."
    })
})


// PATCH /order/status/:id
app.patch('/order/status/:id', async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const STATUS_PRIORITY_MAP = {
        pending: 0,
        shipped: 1,
        delivered: 2,
        returned: 3,
        cancelled: 4,
        rejected: 5
    }

    const order = await Order.findById(id);
    const currentStatus = order.status;

    const currentPriority = STATUS_PRIORITY_MAP[currentStatus];
    const newPriority = STATUS_PRIORITY_MAP[status];

    if (currentPriority > newPriority) {
        return res.json({
            success: false,
            message: `${status} cannot be set once order is ${currentStatus}`
        });
    }
    await Order.updateOne({ _id: id }, { $set: { status } });

    res.json({
        success: true,
        message: "Order status updated successfully.."
    });
})

// GET /orders
app.get('/orders', async (req, res) => {

    const orders = await Order.find().populate("user product");

    // orders.forEach((order) => {
    //     order.product.description = undefined;
    // });

    res.json({
        success: true,
        data: orders,
        message: "Order fetched Successfully"
    });
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
    });
  }
  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
    connectDB();
});