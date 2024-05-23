import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';
import './Services.css'
import { useState } from 'react';

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
    const [selectedNumber, setSelectedNumber] = useState(1);

    const handleSelectChange = (event) => {
        setSelectedNumber(Number(event.target.value));
    };

    return (
        <div className='Service'>
            <div className='serviceWrapper'>
                <form action="">
                    <h1>Phiếu trả hàng</h1>
                    <div className='register'></div>
                    <div className='inputBox4'>
                        <input className='customer' type="text" placeholder="Tên khách hàng" required=""/>
                        <input className='date' type="text" placeholder="Ngày tiếp nhận" required=""/>
                        <input className='phone' type="text" placeholder="Số điện thoại" required=""/>
                        <input className='customer' type="text" placeholder="Nhân viên tiếp nhận" required=""/>
                    </div>
                    <div className='register'></div>
                    <div className='dropDown'>
                        <a>Nhập số lượng sản phẩm:</a>
                        <select onChange={handleSelectChange}>
                            {[...Array(8)].map((_, i) => <option key={i} value={i+1}>{i+1}</option>)}
                        </select>
                    </div>
                    {[...Array(selectedNumber)].map((_, i) => (
                        <div key={i} className='dropDownInputRow'>
                            <a>{ i + 1 }</a>
                            <input className='return' type="text" placeholder="Tên thiết bị" required=""/>
                            <input className='return' type="text" placeholder="Loại thiết bị" required=""/>
                            <input className='quantity' type="text" placeholder="Số lượng" required=""/>
                            <input type="text" placeholder="Mã đơn mua" required=""/>
                            <input className='reason' type="text" placeholder="Lý do" required=""/>
                        </div>
                    ))}
                    <div className='buttonDiv'><button type="button">Nhập</button></div>

                    <div className='register'></div>
                </form>
            </div>
        </div>
    )
}

export default MainMenu;