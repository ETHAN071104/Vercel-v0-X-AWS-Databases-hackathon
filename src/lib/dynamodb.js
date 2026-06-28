import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// 1. Initialize the base DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 2. Create the Document Client
// This automatically converts JavaScript objects into DynamoDB's format
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    convertEmptyValues: true, // DynamoDB hates empty strings, this fixes that
    removeUndefinedValues: true, // Ignores undefined variables in your JS objects
  },
});

export { docClient };