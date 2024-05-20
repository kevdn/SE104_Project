import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';



const MainMenu = () => {

    return (
        <body className="wrapper3">
            <div className='header'>NHẬP HÀNG</div>
            <MenuFunction />
            <Content />
        </body>
    );
}
 

const Content = () => {
    return (
        <div className='Content'>
            Nhập hàng
        </div>
    )
}

export default MainMenu;