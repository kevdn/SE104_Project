import { Menu } from 'antd';
import "./MainMenu.css";
import { FaHome, FaUser, FaPowerOff } from 'react-icons/fa';
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { MdElectricalServices, MdOutlineRule } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const MenuFunction = () => {
    const navigate = useNavigate();

    return (
            <div className='Menuwrapper'>
                <Menu 
                className='navbar'
                onClick={({ key }) => {
                    navigate(key);
                }}
                items={[
                    { label: "Trang chủ", key:"/MainMenu", icon: <FaHome />},
                    { label: "Khách hàng", key:"/Customers", icon: <FaUser />},
                    { label: "Thay đổi quy định", key:"/ChangingRules", icon: <MdOutlineRule />},
                    { label: "Thiết bị", key:"/Devices", icon: <MdElectricalServices />},
                    { label: "Dịch vụ", key:"/Services", icon: <RiCustomerServiceLine />, children: [
                        { label: "Trả hàng", key:"/Service1" },
                        { label: "Sửa chữa", key:"/Service2" },
                        { label: "Bán hàng", key:"/Service3" },
                        { label: "Nhập hàng", key:"/Service4" },
                        { label: "Bảo hành", key:"/Service5" },
                    ]},
                    { label: "Thống kê", key:"/Statistics", icon: <IoStatsChart />, children: [
                        { label: "Báo cáo công nợ", key:"/Statistics1" },
                        { label: "Báo cáo tháng", key:"/Statistics2" },
                    ]},
                    { label: "Đăng xuất", key:"/", icon: <FaPowerOff />, danger: true},
                    ]}>
                </Menu>
            </div>
    );
}

export default MenuFunction;