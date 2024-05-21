import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';



const MainMenu = () => {

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
            Đây là trang chủ, chưa có nội dung.
            Sẽ thêm vào sau. (hoặc xóa)
        </div>
    )
}

export default MainMenu;