const express = require('express');
const db = require('./db/config');
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const { apiPathNotFoundError } = require('./utils/api-error');
const ErrorHandler = require('./middelwares/error-handler');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', route);

app.use(apiPathNotFoundError);
app.use(ErrorHandler.handle());
ErrorHandler.initializeUnhandledException();

app.get('/', async (req, res) => {
  res.send('Welcome to my world...');
});

const initDb = async () => {
  const DATABASE_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
  const DATABASE = process.env.DB || 'Prolink';

  await db(DATABASE_URL, DATABASE);
};

async function startServer() {
  try {
    const port = process.env.PORT || 5001;

    await initDb();

    const server = app.listen(port, () => {
      const isProductionEnvironment =
        process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production';

      const protocol = isProductionEnvironment ? 'https' : 'http';
      const { address, port } = server.address();
      const host = address === '::' ? '127.0.0.1' : address;

      console.log(`Server listening at ${protocol}://${host}:${port}/`);
    });

    // Handle server errors
    server.on('error', (err) => {
      console.error('Server failed to start:', err.message);
      process.exit(1);
    });

    return server;
  } catch (err) {
    console.error('Issue running application:', err.message);
    process.exit(1);
  }
}
// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
