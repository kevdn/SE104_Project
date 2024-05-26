drop database if exists `QLCHTBDT`;
create database `QLCHTBDT`;
use `QLCHTBDT`;

create table `PHIEUNHAPHANG`(
	MaPhieuNhap INT AUTO_INCREMENT primary key ,
	MaNhaCungCap INT not null,
	NgayNhap date not null,
	TraTruoc INT not null, 
	TongTien INT not null
);


create table `CT_PNH`(
	MaCT_PNH INT AUTO_INCREMENT primary key,
	MaPhieuNhap INT not null,
	MaSanPham INT not null,
	SoLuong SMALLINT not null,
	DonGia INT not null,
	ThanhTien INT not null
);

create table `NHACUNGCAP`(
	MaNhaCungCap INT AUTO_INCREMENT primary key,
	TenNhaCungCap Varchar(255) not null,
	DiaChi Varchar(255)  not null,
	ConNo INT not null, 
	SoDienThoai varchar(20) not null
);

create table `LOAISANPHAM`(
	MaLoaiSanPham INT AUTO_INCREMENT primary key ,
	TenLoaiSanPham VARCHAR(255) not null,
	LoiNhuan INT not null
);


create table `SANPHAM`(
	MaSanPham INT AUTO_INCREMENT primary key ,
	TenSanPham varchar(255) not null,
	MaLoaiSanPham INT not null,
	GiaSanPham INT not null,
	NgaySanXuat date not null,
	ThoiGianBaoHanh smallINT not null,
	SoLuongTon smallINT not null, 
	SoLuongBan smallINT not null
);

create table `PHIEUBANHANG`(
	MaPhieuBan INT AUTO_INCREMENT primary key ,
	MaKhachHang INT not null,
	NgayBan date not null,
	MaHTTT INT not null,
	NhanVienBanHang varchar(255) not null,
	ChietKhau float(24) not null,
	TongGiaTriHD int not null	
);



create table `CT_PBH`(
	MaCT_PBH INT AUTO_INCREMENT primary key,
	MaPhieuBan INT not null,
	MaSanPham INT not null,
	SoLuong smallint not null,
	DonGia int not null,
	ThanhTien int not null
);

create table `KHACHHANG`(
	MaKhachHang INT AUTO_INCREMENT primary key,
	TenKhachHang varchar(255) not null,
	MaLoaiKhachHang INT not null,
	SDT varchar(20) not null
);

create table `LOAIKHACHHANG`(
	MaLoaiKhachHang INT AUTO_INCREMENT primary key,
	TenLoaiKhachHang varchar(255) not null
);

create table `HINHTHUCTHANHTOAN`(
	MaHTTT INT AUTO_INCREMENT primary key,
	TenHTTT varchar(255) not null
);

create table `PHIEUBAOHANH`(
	MaPhieuBH INT AUTO_INCREMENT primary key,
	MaKhachHang INT not null,
	NgayTiepNhan date not null,
	NhanVienTiepNhan varchar(255) not null
);

create table `CT_PBHANH`(
	MaCT_PBHANH INT AUTO_INCREMENT primary key,
	MaPhieuBH INT not null,
	MaSanPham INT not null,
	SoLuong smallint not null,
	NgayUocTinhTraLai date not null,
	GhiChu varchar(255) not null
);

create table `PHIEUSUACHUA`(
	MaPhieuSuaChua INT AUTO_INCREMENT primary key,
	MaKhachHang INT not null,
	NgayTienNhan date not null, 
	NhanVienTiepNhan varchar(255) not null,
	TongTien INT not null
);

create table `CT_PSC`(
	MaCT_PSC INT AUTO_INCREMENT primary key,
	MaPhieuSC INT not null,
	MaSanPham INT not null,
	TinhTrang varchar(255) not null,
	MaTienCong INT not null,
	SoLuong smallint not null,
	DonGia int not null, 
	ThanhTien int not null
);

create table `LOAITIENCONG`(
	MaTienCong INT AUTO_INCREMENT primary key,
	TenTienCong varchar(255) not null,
	SoLuong INT not null
);

create table `PHIEUTRAHANG`(
	MaPhieuTra INT AUTO_INCREMENT primary key,
	MaKhachHang INT not null, 
	NgayTraHang date not null,
	NhanVienTiepNhan varchar(255) not null
);

create table `CT_PTH`(
	MaCT_PTH INT AUTO_INCREMENT primary key,
	MaPhieuTra INT not null,
	MaSanPham INT not null,
	SoLuong INT not null, 
	MaPhieuBan INT not null,
	LyDo varchar(255) not null
);

create table `PBCDTT`(
	MaPBCDT INT AUTO_INCREMENT primary key,
	MaPhieuBan INT not null,
	MaSanPham INT not null,
	SoLuotMua int not null, 
	SoLuotBaoHanh int not null, 
	SoLuotSuaChua int not null,
	ThanhTien Decimal(15, 3) not null, 
	TiLe TinyInt not null
);

create table `BAOCAOCONGNO`(
	MaBaoCao INT AUTO_INCREMENT primary key,
	MaNhaCungCap INT not null,
	NoDau int not null, 
	PhatSinh int not null,
	NoCuoi int not null
);

create table `TAIKHOAN`(
	MaTK varchar(255) not null primary key,
	MatKhau varchar(255) not null,
	MaChucVu varchar(255) not null
);

create table `NHANVIEN`(
	CCCD varchar(255) not null primary key,
	MaTK varchar(255) not null,
	HoTen varchar(255) not null
);

create table `CHUCVU`(
	MaChucVu varchar(255) primary key,
	TenChucVu varchar(255) not null
);


create table `CT_CHUCVU`(
	MaCTChucVu INT AUTO_INCREMENT primary key,
	MaChucVu varchar(255) not null,
	MaQuyen INT not null,
	DuocPhep BIT not null
);

create table `QUYEN`(
	MaQuyen INT AUTO_INCREMENT primary key,
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
