import { FaUser, FaLock, FaPhone, FaAddressCard } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
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
                    <div className='inputBox'>
                        <input type="text" placeholder="Số điện thoại" required=""/>
                        <FaPhone className='icon'/>
                    </div>
                    <div className='inputBox'>
                        <input type="password" placeholder="Mật khẩu" required=""/>
                        <FaLock className='icon'/>
                    </div>
                    <div className='inputBox2'>
                        <input type="text" placeholder="Họ và tên" required=""/>
                        <FaUser className='icon'/>
                        <input type="text" placeholder="Ngày sinh" required=""/>
                        <MdOutlineDateRange className='icon2'/>
                    </div>
                    <div className='inputBox'>
                        <input type="text" placeholder="Địa chỉ" required=""/>
                        <FaHouse className='icon'/>
                    </div>
                    <div className='inputBox2'>
                        <input type="text" placeholder="C.C. công dân" required=""/>
                        <FaAddressCard className='icon3'/>
                        <select required>
                            <option value="">Lựa chọn</option>
                            <option value="option1">Mẹ mày</option>
                            <option value="option2">Béo</option>
                            <option value="option3">Mẹ mày</option>
                            <option value="option4">Béo</option>
                            <option value="option5">Mẹ mày</option>
                        </select>
                    </div>
                    <div className='register'></div>
                    <button onClick={handleRegister} type="button">Đăng ký</button>

                    <div className='register'></div>
                </form>
            </div>
        </body>
    );
}
 
export default Register;