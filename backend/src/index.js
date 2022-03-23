const express = require('express');
const cors = require('cors');

const { mongooseConnect } = require('./database/database.js');
const citizensRouter = require('./citizens.router');

const app = express();
app.use(cors());

app.use('/citizens', citizensRouter);

function bootstrap () {
    try {
        app.listen(3000, () => {
            console.log('[Application] Server started on port 3000');
        });
        mongooseConnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

bootstrap();
