require('dotenv').config(); // this is important!

const dbConfig = {
    connectionString: process.env.DATABASE_URL
}

export default dbConfig;