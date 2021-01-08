import * as yup from "yup"

export default yup.object().shape({

name: yup
.string()
.min(3,"name to short min 3")
.max(30, "name to big max 30")
.required("name required"),
category: yup
.string()
.required("category required")
.max(15, "choose category"),
description: yup
.string()
})
