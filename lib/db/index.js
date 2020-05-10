import { MongoClient } from 'mongodb';
var connection = null;
export const connectDB = async () => {
  if (connection) return connection;
  let client;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = client.db('test');
  } catch (error) {
    console.error('Could not connected to test database', error);
    process.exit(1);
  }
  return connection;
};
