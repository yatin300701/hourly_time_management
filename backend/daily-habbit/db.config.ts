import AWS from "aws-sdk"


export class AWSConfig{
    private static instance: AWSConfig;
    private db: AWS.DynamoDB.DocumentClient;
    private s3: AWS.S3;

    constructor(){
        AWS.config.update({
            region:"ap-south-1",
            accessKeyId:process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        })
        this.s3 = new AWS.S3();
        this.db = new AWS.DynamoDB.DocumentClient();
    }  

    public static getInstance(): AWSConfig {
        if (!AWSConfig.instance) {
            AWSConfig.instance = new AWSConfig();
        }
        return AWSConfig.instance;
    }

    public getDb() {
        return this.db;
    }
    public getS3(){
        return this.s3;
    }

}

