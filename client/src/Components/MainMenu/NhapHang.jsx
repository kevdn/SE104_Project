import { Menu } from "antd";
import "./MainMenu.css";
import MenuFunction from "./MenuFunction";
import "./Services.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MainMenu = () => {

  const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3001/NhapHang", {
            headers :{
                accessToken: localStorage.getItem("NhanVienToken") ||localStorage.getItem("TruongPhongToken")
            }
        })
        .then((res) => {
            if (res.data.err){
                alert("Chưa đăng nhập");
                navigate(-1)
            }       
        })
    }, [navigate])
  return (
    <div className="wrapper3">
      <div className="header">NHẬP HÀNG</div>
      <MenuFunction />
      <Content />
    </div>
  );
};

const calculateTotal = (products) => {
  return products.reduce((total, product) => total + Number(product.total), 0);
};




const Content = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [provider, setProvider] = useState("");
  const [dateProvided, setDateProvided] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [advancePayment, setAdvancePayment] = useState(0);
  const [chiPhiPhatSinh, setChiPhiPhatSinh] = useState(0);
  const [products, setProducts] = useState([ 
    {
      name: "",
      type: "",
      productionDate: "",
      warrantyPeriod: "",
      quantity: "",
      price: "",
      total: "",
    },
  ]);

  const handleSelectChange = (event) => {
    const numberOfProducts = Number(event.target.value);
    setSelectedNumber(numberOfProducts);
    setProducts(
      Array.from({ length: numberOfProducts }, () => ({
        name: "",
        type: "",
        productionDate: "",
        warrantyPeriod: "",
        quantity: "",
        price: "",
        total: "",
      }))
    );
  };

  const handleInputChange = (index, event) => {
    const values = [...products];
    if (event.target.name === "quantity" || event.target.name === "price") {
      values[index][event.target.name] = event.target.value;
      values[index].total = values[index].quantity * values[index].price;
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setProducts(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Calculate TraTruoc and TongTien for PHIEUNHAPHANG
    const TongTien = calculateTotal(products); // Replace with your actual calculation
    const No = TongTien - advancePayment + chiPhiPhatSinh;
  
    // Prepare the products data
    const productsData = products.map((product) => {
      // Calculate ThanhTien for CT_PNH
      const ThanhTien = product.quantity * product.price;
  
      return {
        TenSanPham: product.name,
        LoaiSanPham: product.type,
        NgaySanXuat: product.productionDate,
        ThoiGianBaoHanh: product.warrantyPeriod,
        SoLuong: product.quantity,
        DonGia: product.price,
        ThanhTien: ThanhTien
      };
    });
  
    const data = {
      TenNhaCungCap: provider,
      NgayNhap: dateProvided,
      TraTruoc: advancePayment,
      TongTien: TongTien,
      DiaChi: address,
      SoDienThoai: phone,
      No: No,
      products: productsData
    };
  
    axios
      .post("http://localhost:3001/NhapHang", data)
      .then((response) => {
        if (response.data === "Success") {
          alert(`Products entered successfully`);
          window.location.reload();
        } else {
          alert(`Failed to enter products: ${response.data}`);
        }
      })
      .catch((error) => {
        console.error(`There was an error submitting the form!`, error);
      });
  };

  return (
    <div className="Service">
      <div className="serviceWrapper">
        <form onSubmit={handleSubmit}>
          <h1>Phiếu nhập hàng</h1>
          <div className="register"></div>
          <div className="inputBox2">
            <input
              className="provider"
              type="text"
              placeholder="Tên nhà cung cấp"
              required
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            />
            <input
              className="dateProvided"
              type="text"
              placeholder="Ngày nhập"
              required
              value={dateProvided}
              onFocus={(e) => e.target.setAttribute('type', 'date')}
              onBlur={(e) => e.target.type === 'date' && e.target.value === '' && e.target.setAttribute('type', 'text')}
              onChange={(e) => setDateProvided(e.target.value)}
            />
            <input
              className="phone"
              type="text"
              placeholder="Số điện thoại"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="address"
              type="text"
              placeholder="Địa chỉ"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="register"></div>
          <div className="dropDown">
            <a>Nhập số lượng sản phẩm:</a>
            <select onChange={handleSelectChange} value={selectedNumber}>
              {[...Array(8)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          {products.map((product, index) => (
            <div key={index} className="dropDownInputRow">
              <label>{index + 1}</label>
              <input
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                required
                value={product.name}
                onChange={(e) => handleInputChange(index, e)}
              />
              <select
                type="text"
                name="type"
                placeholder="Loại sản phẩm"
                required
                value={product.type}
                onChange={(e) => handleInputChange(index, e)}
              >
                <option value="Laptop">Laptop</option>
                <option value="Dien thoai">Dien thoai</option>
                <option value="May tinh bang">May tinh bang</option>
              </select>
              <input
                type="text"
                name="productionDate"
                placeholder="Ngày sản xuất"
                required
                value={product.productionDate}
                onFocus={(e) => e.target.setAttribute('type', 'date')}
                onBlur={(e) => e.target.type === 'date' && e.target.value === '' && e.target.setAttribute('type', 'text')}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="warrantyPeriod"
                placeholder="Thời hạn bảo hành (tháng)"
                required
                value={product.warrantyPeriod}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                className="quantity"
                type="text"
                name="quantity"
                placeholder="Số lượng"
                required
                value={product.quantity}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="price"
                placeholder="Đơn giá"
                required
                value={product.price}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="total"
                placeholder="Thành tiền"
                required
                value={product.total}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}
          <div className="totalFields">
            <div className="fieldRow">
                <label>Chi phi phat sinh:</label>
                <input
                  type="number"
                  name="Chi Phi Phat Sinh"
                  required
                  onChange={(e) => setChiPhiPhatSinh(Number(e.target.value))}
                />
              </div>
            <div className="fieldRow">
              <label>Tra truoc:</label>
              <input
                type="number"
                name="Tra Truoc "
                required
                onChange={(e) => setAdvancePayment(Number(e.target.value))}
              />
            </div>
            <div className="fieldRow">
              <label>Tong tien:</label>
              <input
                type="number"
                name="Tong Tien "
                required
                value={products.reduce((total, product) => total + Number(product.total), 0) - advancePayment + chiPhiPhatSinh}
                readOnly
              />
            </div>
          </div>

          <div className="buttonDiv">
            <button type="submit">Nhập</button>
          </div>
          <div className="register"></div>
        </form>
      </div>
    </div>
  );
};

export default MainMenu;