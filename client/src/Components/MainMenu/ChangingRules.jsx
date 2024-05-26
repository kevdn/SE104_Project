import "./MainMenu.css";
import MenuFunction from './MenuFunction';
import './Services.css'
import './ChangingRules.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MainMenu = () => {
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3001/BaoCaoThang", {
            headers :{
                accessToken: localStorage.getItem("TruongPhongToken")
            }
        })
        .then((res) => {
            if (res.data.err){
                alert(res.data.err);
                navigate(-1)
            }       
        })
    }, [navigate])
    return (
        <body className="wrapper3">
            <div className='header'>THAY ĐỔI QUY ĐỊNH</div>
            <MenuFunction />
            <Content />
        </body>
    );
}


const Content = () => {
    const [selectedOption, setSelectedOption] = useState('1');

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    return (
        <div className='Content'>
            <div className='serviceWrapper'>
                <form action="">
                    <h1>Thay đổi quy định</h1>
                    <div className='register'></div>
                    <div className='ruleChoice'>
                        <p>Chọn quy định muốn thay đổi:</p>
                        <select onChange={handleSelectChange}>
                            <option value="1">Thay đổi loại tiền công</option>
                            <option value="2">Thay đổi loại sản phẩm</option>
                            <option value="3">Thay đổi hình thức thanh toán</option>
                        </select>
                    </div>
                    <div className='register'></div>


                    { selectedOption == 1 && (<div className="tienCong">
                        <div>
                            <p>Thêm loại tiền công: </p>
                            <input type="text" placeholder="Nhập loại tiền công mới" required=""/>
                            <button className="ruleButton" type="submit">Thêm</button>
                        </div>
                        <div>
                            <p>Xóa loại tiền công: </p>
                            <select>
                                <option value="1">Chọn loại tiền công muốn xóa</option>
                                <option value="2">1</option>
                                <option value="3">2</option>
                                <option value="4">3</option>
                                <option value="5">4</option>
                                <option value="6">5</option>
                                <option value="7">6</option>
                                <option value="8">7</option>
                                <option value="9">8</option>
                                <option value="10">9</option>
                                <option value="11">10</option>
                            </select>
                            <button className="ruleButton" type="submit">Xóa</button>
                        </div>
                    </div>
                    )}


                    { selectedOption == 2 && (<div className="sanPham">
                        <div>
                            <p>Thêm loại sản phẩm: </p>
                            <input type="text" placeholder="Nhập loại sản phẩm mới" required=""/>
                            <button className="ruleButton" type="submit">Thêm</button>
                        </div>
                        <div>
                            <p>Xóa loại sản phẩm: </p>
                            <select>
                                <option value="1">Chọn loại sản phẩm muốn xóa</option>
                                <option value="2">1</option>
                                <option value="3">2</option>
                                <option value="4">3</option>
                            </select>
                            <button className="ruleButton" type="submit">Xóa</button>
                        </div>
                    </div>
                    )}

                    { selectedOption == 3 && (<div className="hinhThuc">
                        <div>
                            <p>Thêm hình thức thanh toán: </p>
                            <input type="text" placeholder="Nhập loại hình thức thanh toán mới" required=""/>
                            <button className="ruleButton" type="submit">Thêm</button>
                        </div>
                        <div>
                            <p>Xóa hình thức thanh toán: </p>
                            <select>
                                <option value="1">Chọn hình thức thanh toán muốn xóa</option>
                                <option value="2">1</option>
                                <option value="3">2</option>
                                <option value="4">3</option>
                            </select>
                            <button className="ruleButton" type="submit">Xóa</button>
                        </div>
                    </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default MainMenu;
