const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

//routes
const loginRouter = require('./routes/Login');
app.use('/', loginRouter);

const registerRouter = require('./routes/Register');
app.use('/', registerRouter);

const mainMenuRouter = require('./routes/MainMenu');
app.use('/', mainMenuRouter);

const banHangRouter = require('./routes/BanHang');
app.use('/', banHangRouter);

const baoCaoCongNoRouter = require('./routes/BaoCaoCongNo');
app.use('/', baoCaoCongNoRouter);

const baoCaoThangRouter = require('./routes/BaoCaoThang');
app.use('/', baoCaoThangRouter);

const changingRulesRouter = require('./routes/ChangingRules');
app.use('/', changingRulesRouter);

const customersRouter = require('./routes/Customers');
app.use('/', customersRouter);

const devicesRouter = require('./routes/Devices');
app.use('/', devicesRouter);

const nhapHangRouter = require('./routes/NhapHang');
app.use('/', nhapHangRouter);

const thanhToanRouter = require('./routes/ThanhToan');
app.use('/', thanhToanRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
}
);
