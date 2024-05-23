import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogIn = () => {
        navigate("/MainMenu");
    }

    const handleRegister = () => {
        navigate("/Register");
    }

    const handleForgot = () => {
        navigate("/Forgot");
    }

    return (
        <body className="wrapper2">
            <div className='wrapper'>
                <form action="">
                    <h1>Đăng nhập</h1>
                    <div className='inputBox'>
                        <input type="text" placeholder="Email/Số điện thoại" required=""/>
                        <FaUser className='icon'/>
                    </div>
                    <div className='inputBox'>
                        <input type="password" placeholder="Mật khẩu" required=""/>
                        <FaLock className='icon'/>
                    </div>

                    <div className='forgot'>
                        <a href="" onClick={handleForgot}>Quên mật khẩu?</a>
                    </div>
                    
                    <button onClick={handleLogIn} type="button">Đăng nhập</button>

                    <div className='register'>
                        <p>Chưa có tài khoản? <a href="" onClick={handleRegister}>Đăng ký</a></p>
                    </div>
                </form>
            </div>
        </body>
    );
}
 
export default Login;