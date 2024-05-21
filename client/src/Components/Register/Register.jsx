import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/");
    }

    return (
        <body className="wrapper2">
            <div className='wrapper'>
                <form action="">
                    <h1>Đăng ký</h1>
                    <div className='register'></div>
                    <div className='inputBox2'>
                        <input type="text" placeholder="Họ" required=""/>
                        <input type="text" placeholder="Tên" required=""/>
                    </div>
                    <div className='inputBox'>
                        <input type="text" placeholder="Số điện thoại" required=""/>
                        <FaUser className='icon'/>
                    </div>
                    <div className='inputBox'>
                        <input type="password" placeholder="Mật khẩu" required=""/>
                        <FaLock className='icon'/>
                    </div>
                    <div className='inputBox'>
                        <input type="password" placeholder="Xác nhận mật khẩu" required=""/>
                        <FaLock className='icon'/>
                    </div>
                    <button onClick={handleRegister} type="button">Đăng ký</button>

                    <div className='register'></div>
                </form>
            </div>
        </body>
    );
}
 
export default Register;