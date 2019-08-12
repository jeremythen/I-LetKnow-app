const express = require('express');
require('./db/mongoose_connection');
const userRouter = require('./routers/user');
const messageRouter = require('./routers/message');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(messageRouter);

app.listen(port, () => {
    console.log(`Service is up on port ${port}`)
})