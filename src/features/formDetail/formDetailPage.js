import { useLayoutEffect, useState } from "react";


function formDataType(type) {
    switch (type) {
        case "STRING":
            return "text"

        case "NUMBER":
            return "number"

        case "COLOR":
            return "color"

        case "EMAİL":
            return "email"

        case "PASSWORD":
            return "password"

        default:
            return "text"
    }
}

const FormDetailPage = () => {

    const [data, setData] = useState(null)

    useLayoutEffect(() => {

        const formData = JSON.parse(localStorage.getItem("formData"))
        const formId = localStorage.getItem("formId")

        if (formData) {
            const a = formData.find((data, index) => index === formId)
            setData(a)
        }

    }, [])

    return (
        <div className="container mt-5">

            <h3>Form Detay</h3>
            <hr />

            <div className="mb-3 mt-5 d-flex gap-4 flex-column">
                <div>
                    <h5>
                        Form Adı
                    </h5>
                    {data?.name}
                </div>

                <div>
                    <h5>
                        Form Açıklaması
                    </h5>
                    {data?.description}
                </div>

                <div>
                    <h5>
                        Form Oluşturulma Tarihi
                    </h5>
                    {data?.createdAt}
                </div>

                <h4>Form</h4>

                <div className="border-top pt-3">
                    {
                        data?.fields && data?.fields.map((form, index) => {
                            return (
                                <div style={{ width: "max-content" }} key={index}>
                                    <label className="w-100 text-uppercase mb-2">{form?.name}</label>
                                    <input className="form-control" name={form?.name} required={form?.required} type={formDataType(form?.dataType)} />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div >
    )
}
export default FormDetailPage