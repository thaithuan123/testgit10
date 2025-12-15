const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());

// Cấu hình kết nối lấy từ Docker
const dbConfig = {
    host: process.env.DB_HOST || 'mysql_db', 
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'testdb',
};

// Hàm kết nối có tự động thử lại (để không bị lỗi khi DB bật chậm)
const connectDB = () => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.log('Đang chờ MySQL khởi động... (5s)');
            setTimeout(connectDB, 5000);
        } else {
            console.log('>>> KẾT NỐI MYSQL THÀNH CÔNG!');
        }
    });
};
connectDB();

app.get('/', (req, res) => {
    res.json({ message: "Backend & MySQL đã kết nối thành công!" });
});

app.listen(3000, () => {
    console.log('Backend running on port 3000');
});