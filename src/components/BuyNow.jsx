import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AlertPopup from "./AlertPopup";

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const products = Array.isArray(location.state?.product)
    ? location.state.product
    : [location.state?.product];

  console.log("buy now = ", products);

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">No product selected.</p>
    );
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (values) => {
    console.log("Order Details:", values);
    setOrderConfirmed(true);
    // handleAddToCart();
    setTimeout(() => navigate("/"), 3000);
  };
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleAddToCart = () => {
    setAlertTitle("Success");
    setAlertMessage("Item added to cart successfully!");
    setAlertType("success");
    setShowAlert(true);
  };

  const handleDeleteItem = () => {
    setAlertMessage("Item removed from cart.");
    setAlertType("error");
    setShowAlert(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow-lg bg-white mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Confirm Your Order
      </h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center border p-4 rounded"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-auto mb-3"
            />
            <h3 className="text-lg font-semibold text-center">
              {product.title}
            </h3>
            <p className="text-xl font-bold text-orange-500">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
      <Formik
        initialValues={{ name: "", phone: "", address: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <div className="mb-3">
              <label className="block font-semibold">Your Name</label>
              <Field
                type="text"
                name="name"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-3">
              <label className="block font-semibold">Phone Number</label>
              <Field
                type="text"
                name="phone"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-3">
              <label className="block font-semibold">Address</label>
              <Field
                as="textarea"
                name="address"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600"
            >
              Confirm Order
            </button>
          </Form>
        )}
      </Formik>
      <button
        onClick={()=>{navigate("/")}}
        className="w-full mt-4 bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600"
      >
        Go To Home
      </button>
      {/* {showAlert && <AlertPopup title={alertTitle} message={alertMessage} type={alertType} onClose={() => setShowAlert(false)} />} */}
      {orderConfirmed && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 text-center rounded">
          Your order is booked! You will receive your product soon.
        </div>
      )}
    </div>
  );
};

export default BuyNow;
