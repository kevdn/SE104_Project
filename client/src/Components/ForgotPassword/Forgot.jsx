import { MdAttachEmail } from "react-icons/md";

const Forgot = () => {
    const handleClick = () => {
        alert("Đã gửi mã xác minh tới bạn, vui lòng xác nhận");
    }

    return (
        <body className="wrapper2">
            <div className='wrapper'>
                <form action="">
                    <h1>Đặt lại mật khẩu</h1>
                    <div className='inputBox'>
                        <input type="text" placeholder="Số điện thoại" required=""/>
                        <MdAttachEmail className="icon"/>
                    </div>
                    
                    <button onClick={ handleClick } type="button">Gửi mã xác nhận</button>
                </form>
            </div>
        </body>
    );
}
 
export default Forgot;