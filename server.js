import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'
//App Config
//creates instance
const app = express();
const port = process.env.PORT || 8001
const db_password = "mVTCuaphEVv66BsP"
const db_name = `tinderdb`
const connection_url = `mongodb+srv://admin:${db_password}@cluster0.ip0nv.mongodb.net/${db_name}?retryWrites=true&w=majority`
// const connection_url = `mongodb+srv://admin:mVTCuaphEVv66BsP@cluster0.ip0nv.mongodb.net/tinderdb?retryWrites=true&w=majority`
// const connection_url = 'mongodb+srv://admin:0A3bhALmndZrta5j@cluster0.ip0nv.mongodb.net/tinderdb?retryWrites=true&w=majority'

//Moddlewares
app.use(express.json())
app.use(Cors())
//DB config 
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
// API endpoint 
app.get('/', (req, res)=> res.status(200).send('I am online :D'))
app.post('/cards', (req,res)=>{
    const dbCard = req.body;
    Cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    }) 
}) 
app.get('/cards', (req,res)=>{

    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
// app.delete('/cards', (req,res)=>{

//     Cards.deleteOne((err, data)=>{
//         if(err){
//             res.status(500).send(err)
//         }
//         else{
//             res.status(200).send(data)
//         }
//     })
// })
//Listener
app.listen(port, ()=>console.log(`listening on port ${port}`))

// databasepassword mVTCuaphEVv66BsP
//mongodb+srv://admin:<password>@cluster0.ip0nv.mongodb.net/<dbname>?retryWrites=true&w=majority