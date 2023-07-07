import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

import moment from "moment";

const FieldArray = ({ control, register, setValue, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "fields"
    });

    useEffect(() => {
        const today = moment().format("YYYY-MM-DD")
        setValue("createdAt", today);
    }, [setValue]);

    return (
        <>
            <ul className="m-0 p-0">
                {fields.map((item, index) => (
                    <li key={item.id} className="mb-3" style={{ listStyleType: "none" }}>

                        <div>
                            <div>Lütfen Form Adını Girin</div>
                            <input className="form-control" {...register(`name`)} />
                            <div className="text-danger">
                                {errors.name && <p>{errors.name.message}</p>}
                            </div>
                        </div>

                        <div>
                            <div>Lütfen Açıklamasını Girin</div>
                            <textarea className="form-control" {...register(`description`)} />
                            <div className="text-danger">
                                {errors.description && <p>{errors.description.message}</p>}
                            </div>
                        </div>

                        <hr />

                        <h4>Form Detayları</h4>

                        <div className="mb-2">
                            <div>Input Name</div>
                            <input className="form-control" {...register(`fields.${index}.name`)} />

                            <div className="text-danger">
                                {errors["fields"]?.[index]?.name && <p>
                                    Name is a required field
                                </p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div>Input Type</div>
                            <select className="form-select" {...register(`fields.${index}.dataType`)}>
                                <option selected>Tip Seçiniz</option>
                                <option value="STRING">String</option>
                                <option value="NUMBER">Number</option>
                                <option value="EMAİL">Email</option>
                                <option value="PASSWORD">Password</option>
                                <option value="COLOR">Color</option>

                            </select>
                            <div className="text-danger">
                                {errors["fields"]?.[index]?.dataType && <p>
                                    dataType is a required field
                                </p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div>Required</div>
                            <input type="checkbox" {...register(`fields.${index}.required`)} />
                        </div>

                        <button className="btn btn-danger text-white" type="button" onClick={() => remove(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <section>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        append({ name: "append" });
                    }}
                >
                    Ekle
                </button>
            </section>
        </>
    )
}
export default FieldArray;
