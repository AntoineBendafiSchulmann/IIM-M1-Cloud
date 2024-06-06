const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const dynamoDbClient = new DynamoDBClient({ region: 'us-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ status: "error", message: "Method not allowed" });
    return;
  }

  const combatresult = req.body;

  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: "pokecombat",
        Item: combatresult,
      })
    );
    res.status(200).json({ status: "success", data: { id: combatresult.id } });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
