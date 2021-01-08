import * as yup from "yup"

export default yup.object().shape({

name: yup
.string()
.required("name required"),
category: yup
.string()
.required("category required"),
})
