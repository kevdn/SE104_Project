import { Menu } from 'antd';
import "./MainMenu.css";
import MenuFunction from './MenuFunction';
import './Services.css'
import { useState } from 'react';

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
    const [selectedNumber, setSelectedNumber] = useState(1);

    const handleSelectChange = (event) => {
        setSelectedNumber(Number(event.target.value));
    };
    

    return (
        <div className='Service'>
            <div className='serviceWrapper'>
                <form action="">
                    <h1>Phiếu nhập hàng</h1>
                    <div className='register'></div>
                    <div className='inputBox2'>
                        <input className='provider' type="text" placeholder="Tên nhà cung cấp" required=""/>
                        <input className='dateProvided' type="text" placeholder="Ngày nhập" required=""/>
                        <input className='phone' type="text" placeholder="Số điện thoại" required=""/>
                        <input className='address' type="text" placeholder="Địa chỉ" required=""/>
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
                            <input type="text" placeholder="Tên sản phẩm" required=""/>
                            <input type="text" placeholder="Loại sản phẩm" required=""/>
                            <input type="text" placeholder="Ngày sản xuất" required=""/>
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