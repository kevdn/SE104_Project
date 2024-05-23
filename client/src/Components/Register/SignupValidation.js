function validation(values) {
    let error = {}
    const phoneNumberPattern = /^\d{10}$/
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name === ""){
        error.name = "Tên không được để trống"
    }
    else error.name = ""

    if (values.tel === ""){
        error.tel = "Số điện thoại không được để trống"
    }
    else if (!phoneNumberPattern.test(values.tel)) {
        error.tel = "Số điện thoại không hợp lệ"
    }
    else {
        error.tel = ""
    }

    if (values.password === ""){
        error.password = "Mật khẩu không được để trống"
    }
    else if (!passwordPattern.test(values.password)) {
        error.password = "Mật khẩu không hợp lệ"
    }
    else {
        error.password = ""
    }

    if (values.rewritePassword !== values.password){
        error.rewritePassword = "Khác mật khẩu"
    }
    else {
        error.rewritePassword = ""
    }
    return error;
}

export default validation;
