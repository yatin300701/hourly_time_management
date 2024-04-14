import express, { Request, Response } from 'express';
import { DBOperations } from '../db-operations';
import Joi from "joi";
import moment  from "moment";
import { v4 as uuidv4 } from "uuid";

export const dailyHabbit = express.Router();

dailyHabbit.get('/', async (req: Request, res: Response) => {
  if(req.query.date==undefined||req.query.date=="") return res.status(404).json({msg:"Date is not provided"});
  let  date = req.query.date;
  
  try{
    let db = new DBOperations();
    const data  = await db.queryAllItemsInTable("Habbits",{"partitionKeyName":"accountId","partitionValue":"0"},{"sortKeyName":"date__type","sortKeyValue":`${date}`});
    res.status(200).json({success:true,data:data});
  }catch(err){
    res.status(400).json({msg:"Something went wrong."})
  }

});

dailyHabbit.post('/',async(req:Request,res:Response)=>{
  let schema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string(),
    startDate:Joi.string().required(),
    typeOfHabit:Joi.string()  
  })

  try{
    const {value , error} = schema.validate(req.body,{stripUnknown:true});
    if(error) return res.status(400).json({msg:"Required fields are not given."})
    value.accountId = "0";

    let unixDate = moment().startOf('day').unix();
    value.date__type = unixDate + "___" + value.typeOfHabit + "___"+uuidv4();
    value.startDate = moment(moment().format('YYYY-MM-DD')+" "+value.startDate).unix();

    console.log("value is",value);
    // return res.status(200).send({msg:"hah"});
    let db = new DBOperations();
    const {success,err} = await db.createOrUpdateTableItem({table:"Habbits",data:value});
    if(success){
      return res.json({success:success,err:err});
    }
    return res.status(500).json({success:success,err:err});
  }
  catch(err){
    res.status(400).json({msg:"Something went wrong"});
  }

})

dailyHabbit.patch("/",async(req:Request,res:Response)=>{
  // Joi
  let schema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string(),
    startDate:Joi.number().required(),
    typeOfHabit:Joi.string(),
    date__type:Joi.string().required(),
    done:Joi.bool() ,
    accountId:Joi.string().required(),
  })
  try{
    const {value , error} = schema.validate(req.body,{stripUnknown:true});
    if(error) return res.status(400).json({msg:"Required fields are not given."})
    let db = new DBOperations();
    const {success,err} = await db.createOrUpdateTableItem({table:"Habbits",data:value});
    if(success){
      return res.json({success:success,err:err});
    }
    return res.status(500).json({success:success,err:err});
  }
  catch(err){
    res.status(400).json({msg:"Something went wrong"});
  }
})

dailyHabbit.delete("/",async(req:Request,res:Response)=>{
  console.log(req.body,req.query)
  // let schema = Joi.object({
  //   date___type:Joi.string().required()
  // })
  if(req.query.date__type==undefined)
    return res.status(400).json({msg:"Required fields are not given."})
  try{
    // const {value , error} = schema.validate(req.body,{stripUnknown:true});
    // if(error) return res.status(400).json({msg:"Required fields are not given."})
    let db = new DBOperations();
    const {success,err} = await db.deleteItem("Habbits",{'pkName':"accountId","pkValue":"0","skName":"date__type","skValue":`${req.query.date__type}`});
    if(success){
      return res.json({success:success,err:err});
    }
    return res.status(500).json({success:success,err:err});

  }catch(err){
    res.status(400).json({msg:"Something went wrong"});
  }
})