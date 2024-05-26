import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MainMenu.css";
import MenuFunction from "./MenuFunction";
import "./Services.css";

const MainMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Warranty";

    axios
      .get("http://localhost:3001/BaoHanh", {
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
      <div className="header">BẢO HÀNH</div>
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
      quantity: "",
      returnDate: "",
      notes: "",
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
        quantity: "",
        returnDate: "",
        notes: "",
      }))
    );
  };

  const handleInputChange = (index, event) => {
    const values = [...products];
    values[index][event.target.name] = event.target.value;
    setProducts(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      TenKhachHang: customerName,
      NgayTiepNhan: receiptDate,
      SoDienThoai: phone,
      NhanVienTiepNhan: staff,
      products: products.map((product) => ({
        TenThietBi: product.name,
        LoaiThietBi: product.type,
        SoLuong: product.quantity,
        NgayUocTinhTraLai: product.returnDate,
        GhiChu: product.notes,
      })),
    };

    axios
      .post("http://localhost:3001/BaoHanh", data)
      .then((response) => {
        if (response.data === "Success") {
          alert("Warranty form submitted successfully");
          window.location.reload();
        } else {
          alert(`Failed to submit warranty form: ${response.data}`);
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
          <h1>Phiếu bảo hành</h1>
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
              {[...Array(8)].map((_, i) => (
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
                className="return"
                type="text"
                name="name"
                placeholder="Tên thiết bị"
                required
                value={product.name}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                className="return"
                type="text"
                name="type"
                placeholder="Loại thiết bị"
                required
                value={product.type}
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
                name="returnDate"
                placeholder="Ngày ước tính trả lại"
                required
                value={product.returnDate}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                className="reason"
                type="text"
                name="notes"
                placeholder="Ghi chú"
                required
                value={product.notes}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}
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
