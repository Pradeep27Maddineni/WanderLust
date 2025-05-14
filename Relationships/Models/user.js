const { ref } = require("joi");
const mongoose=require("mongoose");
const {Schema}=mongoose;

main().then(()=>console.log("Connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema=new Schema({
    item:String,
    price:Number,
});

const customerSchema=new Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ]  
});
customerSchema.pre("findOneAndDelete",async ()=>{
    console.log("Pre MiddleWare");
})
customerSchema.post("findOneAndDelete",async ()=>{
    console.log("Post MiddleWare");
})
const Order=mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);

const addCustomer=async ()=>{
    let cust1=new Customer({
        name:"Pradeep",
    });
    let order1=await Order.findOne({item:"Chips"});
    let order2=await Order.findOne({item:"Chocolate"});
    cust1.orders.push(order1);
    cust1.orders.push(order2);
    let result=await cust1.save();
    console.log(result);
}

// const addOrders=async () => {
//     let res=await Order.insertMany([
//         {item:"Samosa",price:12},
//         {item:"Chips",price:30},
//         {item:"Chocolate",price:50},
//     ]);
//     console.log(res);
// };

// addOrders();
// const User=mongoose.model("User",userSchema);

// const addUsers=async()=>{
//     let user1=new User({
//         username:"Pradeep",
//         addresses:[{location:"Ramalayam",city:"Kallur"}]
//     })
//     user1.addresses.push({location:"Shivalam",city:"Guntur"});
//     let result=await user1.save();
//     console.log(result);
// }

// addUsers();