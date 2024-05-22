import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';
import { FaUser, FaLock } from "react-icons/fa";

const MainMenu = () => {

    return (
        <body className="wrapper3">
            <div className='header'>TRẢ HÀNG</div>
            <MenuFunction />
            <Content />
        </body>
    );
}
 

const Content = () => {
    return (
        <div className='Content'>
            <div className='wrapper'>
                <form action="">
                    <h1>Phiếu trả hàng(chưa format)</h1>
                    <div className='register'></div>
                    <div className='inputBox2'>
                        <input type="text" placeholder="Họ" required=""/>
                        <input type="text" placeholder="Tên" required=""/>
                    </div>
                    <div className='inputBox'>
                        <input type="text" placeholder="Email/Số điện thoại" required=""/>
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
                    <button type="button">Đăng ký</button>

                    <div className='register'></div>
                </form>
            </div>
        </div>
    )
}

export default MainMenu;