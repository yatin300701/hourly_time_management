import { DocumentClient } from "aws-sdk/clients/dynamodb";
import {AWSConfig} from "./db.config"


interface KeyObject {
    [key1: string]: string|undefined;
}

export class DBOperations{
    private aws:AWSConfig;
    private db:DocumentClient;
    constructor(){
        this.aws = AWSConfig.getInstance();
        this.db = this.aws.getDb();
    }

    createOrUpdateTableItem = async(payload:{table:string,data:any}) =>{
        const params = {
            TableName:payload.table,
            Item:payload.data
        }
    
        try{
            await this.db.put(params).promise()
            return {success:true,err:""};  
        }catch(err){
            return {success:false,err:err};
        }
    }

    scanAllItemInTable = async(tableName:string) => {
        const params : AWS.DynamoDB.DocumentClient.ScanInput = {
            TableName: tableName
        };
       
        try{
            const result = await this.db.scan(params).promise();
            return result.Items || [];
        }catch(err){
            return { success:false,error:err};
        }
    }

    queryAllItemsInTable = async(tableName:string,pk:{partitionKeyName:string,partitionValue:string},sk?:{sortKeyName:string,sortKeyValue:string}) =>{
        const params:AWS.DynamoDB.DocumentClient.QueryInput = {
            TableName:tableName,
            KeyConditionExpression: "#pk = :pkValue",
            ExpressionAttributeNames: {
                "#pk": pk.partitionKeyName
            },
            ExpressionAttributeValues: {
                ":pkValue": pk.partitionValue
            }
        }

         // If sort key value is provided, add it to the query
         params.ExpressionAttributeNames = params.ExpressionAttributeNames || {};
         params.ExpressionAttributeValues = params.ExpressionAttributeValues || {};
            if (sk !== undefined) {
                params.KeyConditionExpression += " AND begins_with(#sk, :skValue)";
                params.ExpressionAttributeNames["#sk"]  = sk?.sortKeyName;
                params.ExpressionAttributeValues[":skValue"] = sk?.sortKeyValue;
            }
        try{
            const result =  await this.db.query(params).promise();
            return result.Items || [];
        }catch(err){
            return {success:false,error:err};
        }
    }

    updateItemsInTable = async(tableName:string,keys:{pk:{keyName:string,value:string},sk?:{keyName:string,value:string}},expression:string,value:string) =>{
        // const params = {
        //     TableName:tableName,
        //     Key:{
        //     },
        //     UpdateExpression:`SET ${expression} = :${value} `,
        //     ReturnValues:'ALL_NEW'
        // }
        // if(keys.pk!==undefined){
        //     params.Key[keys.pk.keyName] = params.Key[keys.pk.value];
        // }
        // if(keys.sk!=undefined){
        //     params.Key[keys.sk.keyName]= params.Key[keys.sk.value];
        // }
        // try{
        //     const result =  await this.db.query(params).promise();
        //     return result.Items || [];
        // }catch(err){
        //     return {success:false,error:err};
        // }
    }

    deleteItem = async (tableName:string,key:{pkName:string,pkValue:string,skName?:string,skValue?:string})=>{
        const params = {
            TableName: tableName,
            Key: {
            } as KeyObject
          };
          params.Key[key.pkName] = key.pkValue;
          if(key.skName!=undefined){
            params.Key[key.skName] = key.skValue;
          }
        try{
            await this.db.delete(params, (err, data) => {
                if (err) {
                  console.error('Unable to delete item:', err);
                } else {
                  console.log('Delete succeeded:', data);
                }
              });
              return { success:"Successfully deleted",err:false}
        }catch(err){
            return {success:false,err:err};
        }
    }
}

