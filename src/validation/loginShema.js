import * as yup from "yup"

export default yup.object().shape({

username: yup
.string()
.required("Username required")
.min(3,"Username to short min 3")
.max(30, "Username to big max 30"),
password: yup
.string()
.required("Password required")
.min(6,"Password to short min 6")
.max(30,"Password to big max 30")
})
