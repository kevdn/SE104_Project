drop database if exists `QLCHTBDT`;
create database `QLCHTBDT`;
use `QLCHTBDT`;

create table `PHIEUNHAPHANG`(
	MaPhieuNhap varchar(255) primary key not null,
	MaNhaCungCap varchar(255) not null,
	NgayNhap date not null,
	TraTruoc INT not null, 
	TongTien INT not null
);


create table `CT_PNH`(
	MaCT_PNH varchar(255) primary key not null,
	MaPhieuNhap varchar(255) not null,
	MaSanPham varchar(255) not null,
	SoLuong SMALLINT not null,
	DonGia INT not null,
	ThanhTien INT not null
);

create table `NHACUNGCAP`(
	MaNhaCungCap varchar(255) primary key not null,
	TenNhaCungCap Varchar(255) not null,
	DiaChi Varchar(255)  not null,
	ConNo INT not null, 
	ChiPhiPhatSinh INT not null,
	SoDienThoai varchar(20) not null
);

create table `LOAISANPHAM`(
	MaLoaiSanPham varchar(255) primary key not null,
	TenLoaiSanPham varchar(255) not null
);


create table `SANPHAM`(
	MaSanPham varchar(255) primary key not null,
	TenSanPham varchar(255) not null,
	MaLoaiSanPham varchar(255) not null,
	NgaySanXuat date not null,
	ThoiGianBaoHanh smallINT not null,
	SoLuongTon smallINT not null, 
	SoLuongBan smallINT not null
);

create table `PHIEUBANHANG`(
	MaPhieuBan varchar(255) primary key not null,
	MaKhachHang varchar(255) not null,
	NgayBan date not null,
	MaHTTT varchar(255) not null,
	NhanVienBanHang varchar(255) not null,
	ChieuKhau float(24) not null,
	TongGiaTriHD int not null	
);



create table `CT_PBH`(
	MaCT_PBH varchar(255) primary key not null,
	MaPhieuBan varchar(255) not null,
	MaSanPham varchar(255) not null,
	SoLuong smallint not null,
	DonGia int not null,
	ThanhTien int not null
);

create table `KHACHHANG`(
	MaKhachHang varchar(255) primary key not null,
	TenKhachHang varchar(255) not null,
	MaLoaiKhachHang varchar(255) not null,
	SDT varchar(20) not null
);

create table `LOAIKHACHHANG`(
	MaLoaiKhachHang varchar(255) primary key not null,
	TenLoaiKhachHang varchar(255) not null
);

create table `HINHTHUCTHANHTOAN`(
	MaHTTT varchar(255) primary key not null,
	TenHTTT varchar(255) not null
);

create table `PHIEUBAOHANH`(
	MaPhieuBH varchar(255) primary key not null,
	MaKhachHang varchar(255) not null,
	NgayTiepNhan date not null,
	NhanVienTiepNhan varchar(255) not null
);

create table `CT_PBHANH`(
	MaCT_PBHANH varchar(255) primary key not null,
	MaPhieuBH varchar(255) not null,
	MaSanPham varchar(255) not null,
	SoLuong smallint not null,
	NgayUocTinhTraLai date not null,
	GhiChu varchar(255) not null
);

create table `PHIEUSUACHUA`(
	MaPhieuSuaChua varchar(255) primary key not null,
	MaKhachHang varchar(255) not null,
	NgayTienNhan date not null, 
	NhanVienTiepNhan varchar(255) not null,
	TongTien INT not null
);

create table `CT_PSC`(
	MaCT_PSC varchar(255) primary key not null,
	MaPhieuSC varchar(255) not null,
	MaSanPham varchar(255) not null,
	TinhTrang varchar(255) not null,
	MaTienCong varchar(255) not null,
	SoLuong smallint not null,
	DonGia int not null, 
	ThanhTien int not null
);

create table `LOAITIENCONG`(
	MaTienCong varchar(255) primary key not null,
	SoLuong INT not null
);

create table `PHIEUTRAHANG`(
	MaPhieuTra varchar(255) primary key not null,
	MaKhachHang varchar(255) not null, 
	NgayTraHang date not null,
	NhanVienTiepNhan varchar(255) not null
);

create table `CT_PTH`(
	MaCT_PTH varchar(255) primary key not null,
	MaPhieuTra varchar(255) not null,
	MaSanPham varchar(255) not null,
	SoLuong INT not null, 
	MaPhieuBan varchar(255) not null,
	LyDo varchar(255) not null
);

create table `PBCDTT`(
	MaPBCDT varchar(255) primary key not null,
	MaPhieuBan varchar(255) not null,
	MaSanPham varchar(255) not null,
	SoLuotMua int not null, 
	SoLuotBaoHanh int not null, 
	SoLuotSuaChua int not null,
	ThanhTien Decimal(15, 3) not null, 
	TiLe TinyInt not null
);

create table `BAOCAOCONGNO`(
	MaBaoCao varchar(255) primary key not null,
	MaNhaCungCap varchar(255) not null,
	NoDau int not null, 
	PhatSinh int not null,
	NoCuoi int not null
);

create table `TAIKHOAN`(
	MaTK varchar(255) primary key not null,
	TenTK varchar(255) not null,
	MatKhau varchar(255) not null,
	MaChucVu varchar(255) not null
);

create table `NHANVIEN`(
	MaNhanVien varchar(255) primary key not null,
	MaTK varchar(255) not null,
	HoTen varchar(255) not null,
	NgaySinh date not null, 
	CCCD varchar(255) not null,
	SDT varchar(255) not null,
	DiaChi varchar(255) not null
);

create table `CHUCVU`(
	MaChucVu varchar(255) primary key not null,
	TenChucVu varchar(255) not null
);

create table `CT_CHUCVU`(
	MaCTChucVu varchar(255) primary key not null,
	MaChucVu varchar(255) not null,
	MaQuyen varchar(255) not null,
	DuocPhep BIT not null
);

create table `QUYEN`(
	MaQuyen varchar(255) primary key not null,
	TenQuyen varchar(255) not null
);

alter table PHIEUNHAPHANG
add foreign key (MaNhaCungCap) references NHACUNGCAP(MaNhaCungCap);

alter table CT_PNH
add foreign key(MaPhieuNhap) references PHIEUNHAPHANG(MaPhieuNhap),
add foreign key(MaSanPham) references SANPHAM(MaSanPham);

alter table SANPHAM
add foreign key(MaLoaiSanPham) references LOAISANPHAM(MaLoaiSanPham);

alter table PHIEUBANHANG
add foreign key(MaKhachhang) references KHACHHANG(MaKhachHang),
add foreign key(MaHTTT) references HINHTHUCTHANHTOAN(MaHTTT);

alter table CT_PBH
add foreign key (MaPhieuBan) references PHIEUBANHANG(MaPhieuBan),
add foreign key (MaSanPham) references SANPHAM(MaSanPham);

alter table KHACHHANG
add foreign key (MaLoaiKhachHang) references LOAIKHACHHANG(MaLoaiKhachHang);

alter table CT_PBHANH
add foreign key (MaPhieuBH) references PHIEUBAOHANH(MaPhieuBH),
add foreign key (MaSanPham) references SANPHAM(MaSanPham);

alter table PHIEUSUACHUA
add foreign key (MaKhachHang) references KHACHHANG(MaKhachHang);

alter table CT_PSC
add foreign key (MaPhieuSC) references PHIEUSUACHUA(MaPhieuSuaChua),
add foreign key (MaSanPham) references SANPHAM(MaSanPham),
add foreign key (MaTienCong) references LOAITIENCONG(MaTienCong);

alter table PHIEUTRAHANG
add foreign key (MaKhachHang) references KHACHHANG(MaKhachHang);

alter table CT_PTH
add foreign key (MaPhieuTra) references PHIEUTRAHANG(MaPhieuTra),
add foreign key (MaSanPham) references SANPHAM(MaSanPham);

alter table PBCDTT
add foreign key (MaPhieuBan) references PHIEUBANHANG(MaPhieuBan),
add foreign key (MaSanPham) references SANPHAM(MaSanPham);

alter table BAOCAOCONGNO
add foreign key (MaNhaCungCap) references NHACUNGCAP(MaNhaCungCap);

alter table TAIKHOAN
add foreign key (MaChucVu) references CHUCVU(MaChucVu);

alter table NHANVIEN
add foreign key (MaTK) references TAIKHOAN(MaTK);

alter table CT_CHUCVU
add	foreign key (MaChucVu) references CHUCVU(MaChucVu),
add foreign key (MaQuyen) references QUYEN(MaQuyen);





