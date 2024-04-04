import express, { Request, Response } from 'express';
import { DBOperations } from '../db-operations';

export const dailyHabbit = express.Router();

dailyHabbit.get('/', async (req: Request, res: Response) => {
  let db = new DBOperations();
  const data  = await db.queryAllItemsInTable("memories",{"partitionKeyName":"accountID","partitionValue":"1234"});
  res.status(200).json({success:true,data:data});
});

dailyHabbit.post('/',async(req:Request,res:Response)=>{
  let db = new DBOperations();
  const {success,err} = await db.createOrUpdateTableItem({table:"memories",data:{accountID:"hah",type_key:"k"}});
  if(success){
    return res.json({success:success,data:err,"ss":"s"});
  }
  return res.status(500).json({success:success,err:err});
})