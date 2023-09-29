import express from 'express';
const app=express();
//-------------------------------
import body from 'body-parser';
//-------------------------------
import mongoose from 'mongoose';
mongoose.connect("mongodb+srv://BhatRaj:12345678910@cluster0.owr5qvh.mongodb.net/?retryWrites=true&w=majority/todoList");
//-------------------------------
const port=process.env.PORT || 3000;
//-------------------------------
const todoSchema={
    _id:Number,
    content:String,
}
const todoModel=new mongoose.model('TodoList',todoSchema);
//-------------------------------

app.use(express.static("./public"));
app.use(body.urlencoded({extended:true}));
//-------------------------------

app.get('/',async (req,res)=>{
    try{
        const date=new Date().toDateString();
        const arr=await todoModel.find({});
        res.render('index.ejs',{
            heading:'today',
            todo:arr,
            date:date,      
        });
    }catch(err){
        console.log("error i initial get")
    }
});
//-------------------------------
app.post('/new',async (req,res)=>{
    try{
        const arr=await todoModel.find({});
        const newObj=new todoModel({
            _id:arr.length+1,
            content:req.body.content,
        });
        newObj.save();
        res.redirect('/');
    }catch(err){
        console.log('error in post')
    }
});

//-------------------------------
app.get('/done/:id',async (req,res)=>{
    try{
        const _id=parseInt(req.params.id);
        await todoModel.deleteOne({_id:_id}) ;
        res.redirect('/');
    }catch(err){
        console.log("error while deleting");
    }
    
});
//-------------------------------
//all down is for lists for specific places..
// const listSchema={
//     name:String,
//     todos:[todoSchema],
// };
// const listModel=new mongoose.model('customLists',listSchema);
//-------------------------------
// app.get('/:listName',async (req,res)=>{
//     const listName=req.params.listName;
//     const ifExists= await listModel.findOne({name:listName});
//     const date=new Date().toDateString();
//     if(!ifExists){
//         await listModel.insertMany({
//             name:listName,
//             todos:[]
//         });  
//         res.redirect('/'+listName);//no ':' cause you are calling that page
//     }else{
//         res.render("index.ejs",{
//             heading:ifExists.name,
//             todo:ifExists.todos,
//             date:date
//         });
//     }
// });
//if you want to continue..watch web course sec 35,video 269

app.listen(port,()=>{
    console.log("server is up and running");
});
