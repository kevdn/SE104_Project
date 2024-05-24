const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

//routes
const loginRouter = require('./routes/Login');
app.use('/', loginRouter);


app.listen(3001, () => {
    console.log('Server is running on port 3001');
}
);