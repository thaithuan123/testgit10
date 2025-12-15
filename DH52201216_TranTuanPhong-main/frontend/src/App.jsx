/* frontend/src/App.jsx */
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [msg, setMsg] = useState("Đang kết nối tới máy chủ...");
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    // Giả lập độ trễ 1 giây để nhìn thấy hiệu ứng loading
    setTimeout(() => {
      fetch('http://localhost:3000')
        .then(res => {
          if (!res.ok) throw new Error('Lỗi phản hồi từ server');
          return res.json();
        })
        .then(data => {
          setMsg(data.message);
          setStatus("success");
        })
        .catch(() => {
          setMsg("Mất kết nối tới Backend! Hãy kiểm tra Docker.");
          setStatus("error");
        });
    }, 1000);
  }, []);

  return (
    <div className="container">
      <h1 style={{color: 'blue'}}>Chiều Thứ Hai - Ca 3</h1>
      <h1>Bài Thi Cuối Kỳ</h1>
      <p className="subtitle">Hệ thống quản lý mã nguồn mở</p>
      
      <div className={`status-box ${status}`}>
        {status === 'loading' && '⏳ '} 
        {status === 'success' && '✅ '} 
        {status === 'error' && '❌ '}
        {msg}
      </div>
    </div>
  );
}

export default App;