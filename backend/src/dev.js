const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');

dotenv.config();

let mongoServer;

async function startMemoryMongo(){
  try{
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log('✓ MongoDB Memory Server started at', mongoUri);
    process.env.MONGODB_URI = mongoUri;
    
    // Now start the app
    const app = require('./index');
    // App is now listening
  }catch(err){
    console.error('Failed to start MongoDB Memory Server:', err);
    process.exit(1);
  }
}

startMemoryMongo();

// Graceful shutdown
process.on('SIGTERM', async () => {
  if(mongoServer) await mongoServer.stop();
  process.exit(0);
});
