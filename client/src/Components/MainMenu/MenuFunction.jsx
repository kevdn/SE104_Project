import { Menu } from 'antd';
import "./MainMenu.css";
import { FaHome, FaUser, FaPowerOff } from 'react-icons/fa';
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { MdElectricalServices, MdOutlineRule } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const MenuFunction = () => {
    const navigate = useNavigate();
    const NVToken = localStorage.getItem("NhanVienToken")

    const items = [
        { label: "Trang chủ", key:"/MainMenu", icon: <FaHome />},
        { label: "Khách hàng", key:"/Customers", icon: <FaUser />},
        { label: "Thiết bị", key:"/Devices", icon: <MdElectricalServices />},
        { label: "Dịch vụ", key:"/Services", icon: <RiCustomerServiceLine />, children: [
            { label: "Trả hàng", key:"/TraHang" },
            { label: "Sửa chữa", key:"/SuaChua" },
            { label: "Bán hàng", key:"/BanHang" },
            { label: "Nhập hàng", key:"/NhapHang" },
            { label: "Bảo hành", key:"/BaoHanh" },
        ]},
        ];
        
        if (!NVToken){
            items.push({ label: "Thống kê", key:"/Statistics", icon: <IoStatsChart />, children: [
                { label: "Báo cáo công nợ", key:"/BaoCaoCongNo" },
                { label: "Báo cáo tháng", key:"/BaoCaoThang" },
            ]},
            { label: "Thay đổi quy định", key:"/ChangingRules", icon: <MdOutlineRule />},)
        }

        items.push({ label: "Đăng xuất", key:"/", icon: <FaPowerOff />, danger: true})
    return (
            <div className='Menuwrapper'>
                <Menu 
                className='navbar'
                onClick={({ key }) => {
                    if(key === "/"){
                        localStorage.clear("NhanVienToken");
                        localStorage.clear("TruongPhongToken");
                    }
                    navigate(key);
                }}
                items={items}>
                </Menu>
            </div>
    );
}

export default MenuFunction;