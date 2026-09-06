import app from './app';
import { env } from './config/env';
import { prisma } from './config/database';

const startServer = async () => {
  await prisma.$connect();
  app.listen(env.PORT, () => {
    console.log(`🚀 NexaWave backend running on port ${env.PORT}`);
  });
};

startServer();
