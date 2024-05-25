import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:3001/MainMenu", {
            headers :{
                accessToken: localStorage.getItem("NhanVienToken") ||localStorage.getItem("TruongPhongToken")
            }
        })
        .then((res) => {
            if (res.data.err){
                alert(res.data.err);
                navigate("/")
            }       
        })
    }, [navigate])

    return (
        <body className="wrapper3">
            <div className='header'>TRANG CHỦ</div>
            <MenuFunction />
            <Content />
        </body>
    );
}
 

const Content = () => {
    return (
        <div className='Content'>
            Trang web Quản lý cửa hàng thiết bị điện tử
        </div>
    )
}

export default MainMenu;