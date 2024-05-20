import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';



const MainMenu = () => {

    return (
        <body className="wrapper3">
            <div className='header'>THIẾT BỊ</div>
            <MenuFunction />
            <Content />
        </body>
    );
}
 

const Content = () => {
    return (
        <div className='Content'>
            Thiết bị
        </div>
    )
}

export default MainMenu;