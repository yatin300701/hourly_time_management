import { DocumentClient } from "aws-sdk/clients/dynamodb";
import {AWSConfig} from "./db.config"

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
                params.KeyConditionExpression += " AND #sk = :skValue";
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
}

