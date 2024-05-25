import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { useState } from "react";
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        navigate("/Register");
    }

    const handleForgot = (event) => {
        event.preventDefault();
        navigate("/Forgot");
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

   function handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:3001/login', {username, password})
    .then(res => {
        if (res.data.error) alert(res.data.error);
        else {
            if (res.data.role === "1") {
                localStorage.setItem("NhanVienToken", res.data.token);
            }
            else if (res.data.role === "2"){
                localStorage.setItem("TruongPhongToken", res.data.token);
            }
            navigate("/MainMenu")
        }
        
    })
    .catch(err => console.log(err))
   }

    return (
        <body className="wrapper2">
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Đăng nhập</h1>
                    <div className='inputBox'>
                        <input type="text" placeholder="Số điện thoại" name='username'
                        onChange={(event) => {setUsername(event.target.value);}}/>
                        <FaUser className='icon'/>
                    </div>
                    <div className='inputBox'>
                        <input type="password" placeholder="Mật khẩu" name='password'
                        onChange={(event) => {setPassword(event.target.value);}}/>
                        <FaLock className='icon'/>
                    </div>

                    <div className='forgot'>
                        <a href="" onClick={handleForgot}>Quên mật khẩu?</a>
                    </div>
                    
                    <button>Đăng nhập</button>

                    <div className='register'>
                        <p>Chưa có tài khoản? <a href="" onClick={handleRegister}>Đăng ký</a></p>
                    </div>
                </form>
            </div>
        </body>
    );
}
 
export default Login;