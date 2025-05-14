const Order=mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);

const findCustomer=async()=>{
    let result=await Customer.find({}).populate("orders");
    console.log(result[0]);
};

const addCust=async()=>{
    let newCust=new Customer({
        name:"Puli",
    });
    let newOrder=new Order({
        item:"pizza",
        price:250,
    });
    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();
    console.log("added new customer");
}
const delCust= async ()=>{
   await Customer.findByIdAndDelete("67f91887138b1bf5f074088a");
}
delCust(); 
