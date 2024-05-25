import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios'
import { useState, useEffect } from "react";

const Register = () => {
    const navigate = useNavigate();
    
    // const [chucVu, setChucVu] = ([]);
    // useEffect(() => {
    //     axios.get("http://localhost:3001/register")
    //         .then(res => {
    //             setChucVu(res.data);
    //         })
    //         .catch(err => console.log("Error in getting data"));
    // }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [idNumber, setIdNumber] = useState("");
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3001/register', {idNumber, username, password, name, role})
        .then(res => {
            if (res.data === "Register success"){
                navigate("/");
            }
            else {
                alert("Thông tin đăng ký không hợp lệ");
            }
        })
        .catch(err => console.log(err))
   }


    return (
        <body className="wrapper2">
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Đăng ký</h1>
                    <div className='register'></div>
                    <div className='inputBox'>
                        <input type="text" placeholder="Số điện thoại" required="" name="username"
                        onChange={(event) => {setUsername(event.target.value);}}/>
                        <FaPhone className='icon'/>
                    </div>

                    <div className='inputBox'>
                        <input type="password" placeholder="Mật khẩu" required=""name="password"
                        onChange={(event) => {setPassword(event.target.value);}}/>
                        <FaLock className='icon'/>
                    </div>
                    
                    <div className='inputBox'>
                        <input type="text" placeholder="Căn cước công dân" required=""name="idNumber"
                        onChange={(event) => {setIdNumber(event.target.value);}}/>
                        <FaUser className='icon'/>
                    </div>

                    <div className='inputBox'>
                        <input type="text" placeholder="Họ và tên" required=""name="name"
                        onChange={(event) => {setName(event.target.value);}}/>
                        <FaUser className='icon'/>
                    </div>
                    <div className='inputBox'>
                        <input type="text" placeholder="Mã chức vụ" required="" name="role"
                        onChange={(event) => {setRole(event.target.value);}}/>
                    </div>

                    {/* <div className='inputBox2'>
                        <input type="text" placeholder="C.C. công dân" required="" name="idNumber"
                        onChange={(event) => {setIdNumber(event.target.value);}}/>

                        <select required onChange={(event) => {setRole(event.target.value);}}>
                            <option value="">Lựa chọn</option>
                            {
                                chucVu.map((value, key) => {
                                    return (
                                        <option key={key} value={value.MaChucVu}> {value.TenChucVu} </option>
                                    )
                                })
                            }
                        </select>
                    </div> */}
                    <div className='register'></div>
                    <button type="submit">Đăng ký</button>

                    <div className='register'></div>
                </form>
            </div>
        </body>
    );
}
 
export default Register;