const mongoose = require('mongoose');

class Database {
    constructor() {
        this.mongoUrl = process.env.MONGO_URL || process.env.DATABASE_URL || 'mongodb://localhost:27017/concesionaria';
    }

    async connect() {
        try {
            await mongoose.connect(this.mongoUrl);
            // Connection successful
        } catch (error) {
            // MongoDB connection failed
            process.exit(1);
        }
    }

    async disconnect() {
        try {
            await mongoose.connection.close();
            // Disconnected from MongoDB
        } catch (error) {
            // Error disconnecting from MongoDB
        }
    }

    getConnectionState() {
        return mongoose.connection.readyState;
    }
}

module.exports = new Database();