import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';



const MainMenu = () => {

    return (
        <body className="wrapper3">
            <div className='header'>KHÁCH HÀNG</div>
            <MenuFunction />
            <Content />
        </body>
    );
}
 

const Content = () => {
    return (
        <div className='Content'>
            Khách hàng
        </div>
    )
}

export default MainMenu;