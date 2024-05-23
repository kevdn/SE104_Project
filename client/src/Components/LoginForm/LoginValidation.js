function validation(values){
    let error = {};
    const tel_pattern = /^\d{10}$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (values.tel === ""){
        error.tel = "Số điện thoại không được để trống"
    }
    else if (!tel_pattern.test(values.tel)){
        error.tel = "Số điện thoại không hợp lệ"
    }
    else {
        error.tel = ""
    }

    if (values.password === ""){
        error.password = "Mật khẩu không được để trống"
    }
    else if (!password_pattern.test(values.password)){
        error.password = "Mật khẩu không hợp lệ"
    }
    else {
        error.password = ""
    }

    return error;
}

export default validation;
