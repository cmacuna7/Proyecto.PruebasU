const mongoose = require('mongoose');

class Database {
    constructor() {
        this.mongoUrl = process.env.MONGO_URL || process.env.DATABASE_URL || 'mongodb://localhost:27017/concesionaria';
    }

    async connect() {
        try {
            await mongoose.connect(this.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            // Connection successful
        } catch (error) {
            error.message = 'Error conectando a MongoDB: ' + error.message;
            // MongoDB connection failed
            process.exit(1);
        }
    }

    async disconnect() {
        try {
            await mongoose.connection.close();
            // Disconnected from MongoDB
        } catch (error) {
            error.message = 'Error eliminando cliente: ' + error.message;
            // Error disconnecting from MongoDB
        }
    }

    getConnectionState() {
        return mongoose.connection.readyState;
    }
}

module.exports = new Database();