// Override env only for test cases
process.env.PORT = '4000';
process.env.DB_URL = 'mongodb://127.0.0.1:27017/Prolink_test';
process.env.NODE_ENV = 'test';
