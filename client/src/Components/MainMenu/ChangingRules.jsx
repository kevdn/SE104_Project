import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


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
    return (
        <div className='Content'>
            Thay đổi quy định
        </div>
    )
}

export default MainMenu;
