import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MainMenu.css";
import MenuFunction from "./MenuFunction";
import "./Services.css";

const MainMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Repair";

    axios
      .get("http://localhost:3001/SuaChua", {
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
      <div className="header">SỬA CHỮA</div>
      <MenuFunction />
      <Content />
    </body>
  );
};

const Content = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [phone, setPhone] = useState("");
  const [staff, setStaff] = useState("");
  const [products, setProducts] = useState([
    {
      name: "",
      type: "",
      condition: "",
      laborCost: 1,
      quantity: "",
      unitPrice: "",
      totalPrice: "",
    },
  ]);
  const [tongTien, setTongTien] = useState(0);

  const handleSelectChange = (event) => {
    const numberOfProducts = Number(event.target.value);
    setSelectedNumber(numberOfProducts);
    setProducts(
      Array.from({ length: numberOfProducts }, () => ({
        name: "",
        type: "",
        condition: "",
        laborCost: 1,
        quantity: "",
        unitPrice: "",
        totalPrice: "",
      }))
    );
  };

  const handleInputChange = (index, event) => {
    const values = [...products];
    values[index][event.target.name] = event.target.value;
    setProducts(values);
    calculateTotalPrice(values);
  };

  const handleLaborCostChange = (index, event) => {
    const values = [...products];
    values[index].laborCost = Number(event.target.value);
    setProducts(values);
    calculateTotalPrice(values);
  };

  const calculateTotalPrice = (products) => {
    const total = products.reduce((acc, product) => {
      const quantity = Number(product.quantity) || 0;
      const unitPrice = Number(product.unitPrice) || 0;
      const laborCost = Number(product.laborCost) || 0;
      const totalPrice = quantity * unitPrice + laborCost;
      product.totalPrice = totalPrice;
      return acc + totalPrice;
    }, 0);
    setTongTien(total);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      TenKhachHang: customerName,
      NgayTiepNhan: receiptDate,
      SoDienThoai: phone,
      NhanVienTiepNhan: staff,
      products: products.map((product) => ({
        TenSanPham: product.name,
        LoaiSanPham: product.type,
        TinhTrang: product.condition,
        TienCong: product.laborCost,
        SoLuong: product.quantity,
        DonGia: product.unitPrice,
        ThanhTien: product.totalPrice,
      })),
      TongTien: tongTien,
    };

    axios
      .post("http://localhost:3001/SuaChua", data)
      .then((response) => {
        if (response.data === "Success") {
          alert("Repair form submitted successfully");
          window.location.reload();
        } else {
          alert(`Failed to submit repair form: ${response.data}`);
        }
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
      });
  };

  return (
    <div className="Service">
      <div className="serviceWrapper">
        <form onSubmit={handleSubmit}>
          <h1>Phiếu sửa chữa</h1>
          <div className="register"></div>
          <div className="inputBox4">
            <input
              className="customer"
              type="text"
              placeholder="Tên khách hàng"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              className="date"
              type="text"
              placeholder="Ngày tiếp nhận"
              required
              value={receiptDate}
              onFocus={(e) => e.target.setAttribute("type", "date")}
              onBlur={(e) =>
                e.target.type === "date" &&
                e.target.value === "" &&
                e.target.setAttribute("type", "text")
              }
              onChange={(e) => setReceiptDate(e.target.value)}
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
              className="customer"
              type="text"
              placeholder="Nhân viên tiếp nhận"
              required
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
            />
          </div>
          <div className="register"></div>
          <div className="dropDown">
            <a>Nhập số lượng sản phẩm:</a>
            <select onChange={handleSelectChange} value={selectedNumber}>
              {[...Array(7)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          {products.map((product, index) => (
            <div key={index} className="dropDownInputRow">
              <a>{index + 1}</a>
              <input
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                required
                value={product.name}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="type"
                placeholder="Loại sản phẩm"
                required
                value={product.type}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="condition"
                placeholder="Tình trạng"
                required
                value={product.condition}
                onChange={(e) => handleInputChange(index, e)}
              />
              <select
                className="laborDropDown"
                name="laborCost"
                value={product.laborCost}
                onChange={(e) => handleLaborCostChange(index, e)}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
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
                name="unitPrice"
                placeholder="Đơn giá"
                required
                value={product.unitPrice}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="totalPrice"
                placeholder="Thành tiền"
                required
                value={product.totalPrice}
                readOnly
              />
            </div>
          ))}
          <div className="totalFields">
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
