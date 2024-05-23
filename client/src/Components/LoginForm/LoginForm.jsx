import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { useState } from "react";
import validation from "./LoginValidation";
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/Register");
    }

    const handleForgot = () => {
        navigate("/Forgot");
    }

    const [values, setValues] = useState({
        tel: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {   
        event.preventDefault();
        setErrors(validation(values));
        if (errors.name === "" && errors.tel === "" && errors.password === ""){
            axios.post('http://localhost:3001/login', values)
            .then(res => {
                if (res.data === "Success") {
                    navigate("/MainMenu");
                } else {
                    alert("No account found");
                }
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <body className="wrapper2">
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Đăng nhập</h1>
                    <div className='inputBox'>
                        <input type="text" placeholder="Số điện thoại" name='tel'
                        onChange={handleInput}/>
                        {errors.tel && <span className="text-danger"> {errors.tel}</span>}
                        <FaUser className='icon'/>
                    </div>
                    <div className='inputBox'>
                        <input type="password" placeholder="Mật khẩu" name='password'
                        onChange={handleInput}/>
                        {errors.password && <span className="text-danger"> {errors.password}</span>}
                        <FaLock className='icon'/>
                    </div>

                    <div className='forgot'>
                        <a href="" onClick={handleForgot}>Quên mật khẩu?</a>
                    </div>
                    
                    <button type="submit">Đăng nhập</button>

                    <div className='register'>
                        <p>Chưa có tài khoản? <a href="" onClick={handleRegister}>Đăng ký</a></p>
                    </div>
                </form>
            </div>
        </body>
    );
}
 
export default Login;