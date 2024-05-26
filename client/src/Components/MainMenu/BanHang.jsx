import "./MainMenu.css";
import MenuFunction from "./MenuFunction";
import "./Services.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sell Products ";
    axios
      .get("http://localhost:3001/BanHang", {
        headers: {
          accessToken:
            localStorage.getItem("NhanVienToken") ||
            localStorage.getItem("TruongPhongToken"),
        },
      })
      .then((res) => {
        if (res.data.err) {
          alert("Chưa đăng nhập");
          navigate(-1);
        }
      });
  }, [navigate]);

  return (
    <body className="wrapper3">
      <div className="header">BÁN HÀNG</div>
      <MenuFunction />
      <Content />
    </body>
  );
};

const calculateTotal = (products) => {
  return products.reduce((total, product) => total + Number(product.total), 0);
};

const Content = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [customer, setCustomer] = useState("");
  const [customerType, setCustomerType] = useState("cá nhân");
  const [phone, setPhone] = useState("");
  const [staff, setStaff] = useState("");
  const [daySold, setDaySold] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [products, setProducts] = useState([
    {
      name: "",
      type: "",
      warrantyPeriod: "",
      quantity: "",
      price: "",
      total: "",
    },
  ]);
  const [chietKhau, setChietKhau] = useState(0);
  const [tongTien, setTongTien] = useState(0);

  const handleSelectChange = (event) => {
    const numberOfProducts = Number(event.target.value);
    setSelectedNumber(numberOfProducts);
    setProducts(
      Array.from({ length: numberOfProducts }, () => ({
        name: "",
        type: "",
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
    const newTongTien = calculateTotal(values);
    setTongTien(newTongTien);
    setChietKhau(newTongTien >= 5000000 ? newTongTien * 0.05 : 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const productsData = products.map((product) => {
      const ThanhTien = product.quantity * product.price;
      return {
        TenSanPham: product.name,
        LoaiSanPham: product.type,
        ThoiGianBaoHanh: product.warrantyPeriod,
        SoLuong: product.quantity,
        DonGia: product.price,
        ThanhTien: ThanhTien,
      };
    });

    const data = {
      TenKhachHang: customer,
      LoaiKhachHang: customerType,
      SoDienThoai: phone,
      NhanVienTiepNhan: staff,
      NgayBan: daySold,
      HinhThucThanhToan: paymentMethod,
      TongTien: tongTien,
      ChietKhau: chietKhau,
      products: productsData,
    };

    axios
      .post("http://localhost:3001/BanHang", data)
      .then((response) => {
        if (response.data === "Success") {
          alert(`Products sold successfully`);
          window.location.reload();
        } else {
          alert(`Failed to sell products: ${response.data}`);
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
          <h1>Phiếu bán hàng</h1>
          <div className="register"></div>
          <div className="inputBox3">
            <input
              className="customer"
              type="text"
              placeholder="Tên khách hàng"
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <select
              className="customerType"
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              required
            >
              <option value="cá nhân">Ca nhan</option>
              <option value="doanh nghiệp">Doanh nghiep</option>
            </select>
            <input
              className="phone"
              type="text"
              placeholder="Số điện thoại"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="register"></div>
          <div className="inputBox3">
            <input
              className="staff"
              type="text"
              placeholder="Nhân viên tiếp nhận"
              required
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
            />
            <input
              className="daySold"
              type="text"
              placeholder="Ngày bán"
              required
              value={daySold}
              onFocus={(e) => e.target.setAttribute("type", "date")}
              onBlur={(e) =>
                e.target.type === "date" &&
                e.target.value === "" &&
                e.target.setAttribute("type", "text")
              }
              onChange={(e) => setDaySold(e.target.value)}
            />
            <input
              className="paymentMethod"
              type="text"
              placeholder="Hình thức thanh toán"
              required
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="register"></div>
          <div className="dropDown">
            <a>Nhập số lượng sản phẩm:</a>
            <select onChange={handleSelectChange} value={selectedNumber}>
              {[...Array(6)].map((_, i) => (
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
                className="productType"
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
                name="warrantyPeriod"
                placeholder="Thời hạn bảo hành"
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
                readOnly
              />
            </div>
          ))}
          <div className="totalFields">
            <div className="fieldRow">
              <label>Chiết khấu:</label>
              <input
                type="number"
                name="Chiet Khau"
                value={chietKhau}
                readOnly
              />
            </div>
            <div className="fieldRow">
              <label>Tổng tiền:</label>
              <input type="number" name="Tong Tien" value={tongTien} readOnly />
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
