import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';



const MainMenu = () => {

    return (
        <body className="wrapper3">
            <div className='header'>BẢO HÀNH</div>
            <MenuFunction />
            <Content />
        </body>
    );
}
 

const Content = () => {
    return (
        <div className='Content'>
            Bảo hành
        </div>
    )
}

export default MainMenu;