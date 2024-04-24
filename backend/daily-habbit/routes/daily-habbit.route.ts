import express, { Request, Response } from 'express';
import { DBOperations } from '../db-operations';
import Joi from "joi";
import moment  from "moment";
import { v4 as uuidv4 } from "uuid";

export const dailyHabbit = express.Router();

dailyHabbit.get('/', async (req: Request, res: Response) => {
  if(req.query.date==undefined||req.query.date=="") return res.status(404).json({msg:"Date is not provided"});
  
  try{
    let date = new Date(req.query.date as string);
    let dateInUnix = moment(date).startOf('day').unix();
    let db = new DBOperations();
    const data  = await db.queryAllItemsInTable("Habbits",{"partitionKeyName":"accountId","partitionValue":"0"},{"sortKeyName":"date__type","sortKeyValue":`${dateInUnix}`});
    res.status(200).json({success:true,data:data});
  }catch(err){
    res.status(400).json({msg:"Something went wrong."})
  }

});

dailyHabbit.post('/',async(req:Request,res:Response)=>{
  let schema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().empty(''),
    type:Joi.string().empty(''),
    date:Joi.date().iso().allow(null,'').optional() 
  })

  try{
    const {value , error} = schema.validate(req.body,{stripUnknown:true});
    
    if(error) return res.status(400).json({msg:`Required fields are not given.${error}`})
    value.accountId = "0";

    
    let date:number|string ;
    let type:string;

    switch(value.type){
      case 'Today':{
        let unixDate = moment().startOf('day').unix();
        date = unixDate;
        type = "Today"
        break;
      }
      case 'Custom':{
        let unixDate = moment(value.date).startOf('day').unix();
        date = unixDate;
        type = "Today";
        break;
      }
      default: {
          date = "no-date-";
          type = "no-type-";
      }
    } 
    value.date__type =  date as string+ "___" + type + "___"+uuidv4();
    value.date = date;
    value.status = "To-Do"
    value.createdAt =  moment().unix();

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

dailyHabbit.put("/",async(req:Request,res:Response)=>{
  let schema = Joi.object({
    accountId:Joi.string().required(),
    createdAt:Joi.number().required(),
    status:Joi.string().optional(),
    name:Joi.string().required(),
    description:Joi.string().empty('').optional(),
    type:Joi.string().empty(''),
    date:Joi.date().iso().allow(null,'').optional() ,
    date__type:Joi.string().required()
  })
  try{
    const {value , error} = schema.validate(req.body,{stripUnknown:true});
    if(error) return res.status(400).json({msg:`Required fields are not given.${error}`})
      if(value.date!=undefined && value.date!=null){
        value.date = moment(value.date).startOf('day').unix();
      }
    let db = new DBOperations();
    const {success,err} = await db.createOrUpdateTableItem({table:"Habbits",data:value});
    if(success){
      return res.json({success:success,err:err});
    }
    return res.status(500).json({success:success,err:err});
  }
  catch(err){
    res.status(400).json({msg:`Something went wrong, ${err}`});
  }
})

dailyHabbit.delete("/",async(req:Request,res:Response)=>{
  console.log(req.body,req.query)
  if(req.query.date__type==undefined)
    return res.status(400).json({msg:"Required fields are not given."})
  try{
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