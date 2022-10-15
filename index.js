const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');

// mongo setup
const mongoDb = 'mongodb://127.0.0.1/mongoose-demo';
const PORT = 8000;
mongoose.connect(mongoDb, {useNewUrlParser: true, useNewUrlParser: true});

const db = mongoose.connection;

// Post.create({content: 'Amazing post...'});

const post = new Post({ title: "Cat", body: "Yeehaw! Sandos!" });

post.comments.push({ header: 'My comment', content: "What!?"  });

post.save((err) => {
    if (!err) console.log('Success!');
});

// Post.findById(post._id, (err, post) => {
//     if (!err) {
//         post.comments.id(subId).remove();
//         post.save(function (err) {
//             // do something
//         });
//         console.log(post);
//     }
// });


const product = new Product({name: 'Wrench', price: 5});
product.save();
const order = new Order({buyer: 'tester', trackingNumber:"ABC123"})
order.products.push(product)
order.save();
// fetch orders with products populated
//mongoose.Types.ObjectId("634ae8e793d7c52c0dcc8e05")
Order.findOne({}, (err, order) => {
    Order.findById(order._id).populate('products').exec((err, order) => {
        console.log(order);
    });
})
// Order.findById(mongoose.Types.ObjectId("634ae8e793d7c52c0dcc8e05")).populate('products').exec((err, order) => {
//     console.log(order);
// });

db.once('open', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err) {
    console.error(`Database error:\n${err}`);
});

// create a new user called Chris
// const chris = new User({
//     name: 'Chris',
//     email: 'chris@gmail.com',
//     meta: {
//         age: 27,
//         website: 'http://chris.me'
//     }
// });

// const newUser = User({
//     name: 'bob',
//     email: 'bob@gmail.com'
// });

// save the user
// newUser.save(function(err) {
//     if (err) return console.log(err);
//     console.log('User created!');
// });

// create and save a user
// User.create({ name: 'Emily', email: 'em@i.ly' }, function(err, user) {
//     if (err) return console.log(err);
//     console.log(user);
// });

// express setup
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send(chris.sayHello());
});


// Find All
app.get('/findAll', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.send(users);
    });
})
  
  // Find only one user
app.get('/findOne', (req, res) => {
    User.findOne({}, (err, user) => {
        if (err) return res.send(err);
        res.send(user);
      });
})
  
  // Find by email
app.get('/findByEmail/:email', (req, res) => {
    User.find({ email: req.params.email }, (err, user) => {
        if (err) return res.send(err);
        res.send(user);
    });
})

  
  // Find by id
app.get('/findById/:id', (req, res) => {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.send(err);
        res.send(user);
    });
})

app.post('/updateOneByName/:name', (req, res) => {
    User.updateOne({ name: req.params.name }, { meta: { age: 26 } }, (err, user) => {
        if (err) console.log(err);
        console.log(user);
      });
});

app.post('/updateAllByName/:name', (req, res) => {
    User.updateMany({ name: req.params.name }, { meta: { age: 26 } }, (err, user) => {
        if (err) console.log(err);
        console.log(user);
      });
});

app.delete('/deleteByName/:name', (req,res) => {
    User.findOneAndRemove({ name: req.params.name }, function(err) {
        if (err) console.log(err);
        console.log('User deleted!');
    });
})

app.delete('/deleteAllByName/:name', (req,res) => {
    User.remove({ name: req.params.name }, function(err) {
        if (err) console.log(err);
        console.log('Users deleted!');
    });
})
  
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
});
