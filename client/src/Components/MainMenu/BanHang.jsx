import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';
import './Services.css'
import { useState } from 'react';


const MainMenu = () => {

    return (
        <body className="wrapper3">
            <div className='header'>BÁN HÀNG</div>
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
                    <h1>Phiếu bán hàng</h1>
                    <div className='register'></div>
                    <div className='inputBox3'>
                        <input className='customer' type="text" placeholder="Tên khách hàng" required=""/>
                        <input className='customerType' type="text" placeholder="Loại khách hàng" required=""/>
                        <input className='phone' type="text" placeholder="Số điện thoại" required=""/>
                    </div>
                    <div className='register'></div>
                    <div className='inputBox3'>
                        <input className='customer' type="text" placeholder="Nhân viên tiếp nhận" required=""/>
                        <input className='daySold' type="text" placeholder="Ngày bán" required=""/>
                        <input className='paymentMethod' type="text" placeholder="Hình thức thanh toán" required=""/>
                    </div>
                    <div className='register'></div>
                    <div className='dropDown'>
                        <a>Nhập số lượng sản phẩm:</a>
                        <select onChange={handleSelectChange}>
                            {[...Array(7)].map((_, i) => <option key={i} value={i+1}>{i+1}</option>)}
                        </select>
                    </div>
                    {[...Array(selectedNumber)].map((_, i) => (
                        <div key={i} className='dropDownInputRow2'>
                            <a>{ i + 1 }</a>
                            <input type="text" placeholder="Tên sản phẩm" required=""/>
                            <input type="text" placeholder="Loại sản phẩm" required=""/>
                            <input type="text" placeholder="Thời hạn bảo hành" required=""/>
                            <input className='quantity' type="text" placeholder="Số lượng" required=""/>
                            <input type="text" placeholder="Đơn giá" required=""/>
                            <input type="text" placeholder="Thành tiền" required=""/>
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