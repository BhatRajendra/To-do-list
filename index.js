import express from 'express';
const app=express();
import {dirname} from 'path';
import {fileURLToPath} from 'url';
const dir=dirname(fileURLToPath(import.meta.url));
//-------------------------------
import body from 'body-parser';
//-------------------------------
import mongoose from 'mongoose';
mongoose.connect("mongodb+srv://BhatRaj:12345678910@cluster0.owr5qvh.mongodb.net/todoList");
//-------------------------------
const port=process.env.PORT || 3000;
//-------------------------------
const todoSchema={
    _id:Number,
    content:String,
}
const todoModel=new mongoose.model('TodoList',todoSchema);
//-------------------------------

app.use(express.static(dir+"/public"));
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


app.listen(port,()=>{
    console.log("server is up and running on "+ port);
});
