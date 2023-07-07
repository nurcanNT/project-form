import { useForm } from "react-hook-form";
import FormFieldArray from "./components/FormFieldArray";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    fields: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(),
          dataType: yup.string().required(),
        })
      )
  })
  .required();

const FormsPage = () => {
  const [formData, setFormData] = useState([]);
  const [createFormModal, setCreateFormModal] = useState(false);
  const [image, setImage] = useState(null);

  useLayoutEffect(() => {
    const formData = localStorage.getItem("formData");
    const parsedData = JSON.parse(formData);
    setFormData(parsedData);
  }, [createFormModal]);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    reset();
    const updatedFormData = [...formData, data];
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    setCreateFormModal(false);
  };

  useEffect(() => {
    if (formData.length > 0) {
      axios
        .get(`https://picsum.photos/v2/list?limit=${formData.length}`)
        .then((response) => {
          setImage(response.data);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
  }, [formData.length]);

  return (
    <>
      {createFormModal && (
        <div className="modal-container">
          <div className="">
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Form Oluştur</h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setCreateFormModal(false)}
                  ></button>
                </div>
                <div className="modal-body" style={{ maxHeight: "350px", overflowY: "auto" }}>
                  <FormFieldArray
                    {...{ control, register, getValues, setValue, errors }}
                  />
                </div>
                <div className="modal-footer mt-4 d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setCreateFormModal(false)}
                  >
                    İptal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Oluştur
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-5">
          <h2>Form Listeleri</h2>
          <button
            className="btn bg-primary text-white"
            onClick={() => setCreateFormModal(true)}
          >
            Form Oluştur
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Created At</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {formData &&
              formData.map((form, index) => (
                <tr key={index}>
                  <th scope="row">
                    {image &&
                      image.find((a) => a.id === index) && (
                        <img
                          src={image.find((a) => a.id === index).download_url}
                          width={150}
                          alt=""
                        />
                      )}
                  </th>
                  <td>{form.name}</td>
                  <td>{form.description}</td>
                  <td>{form.createdAt}</td>
                  <td>
                    <a
                      href={`/forms/${form.name}`}
                      onClick={() => localStorage.setItem("formId", index)}
                    >
                      <button className="btn btn-secondary">Detay</button>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormsPage;
