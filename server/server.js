import app from './app.js';

const PORT = process.env.PORT || 5000;

import { swaggerDocs } from './config/swagger.js';

const server = app.listen(PORT, () => {
    console.log(`✅ Server running securely on port ${PORT}`);
    swaggerDocs(app, PORT);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
