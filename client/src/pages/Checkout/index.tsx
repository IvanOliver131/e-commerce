import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import { Shipping } from "./components/Shipping";
import { Payment } from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";

type Item = {
  id: number;
  count: number;
  name: string;
  attributes: {
    name: string;
    price: number;
    shortDescription: string;
    image: { data: { attributes: { formats: { medium: { url: string } } } } };
  };
};

type MyState = {
  cart: {
    cart: Array<Item>;
    isCartOpen: boolean;
  };
};

const initialValues = {
  billingAddress: {
    name: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
  },
  phoneNumber: "",
  paymentForm: "",
  payment: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      name: yup.string().required("required"),
      street: yup.string().required("required"),
      number: yup.string().required("required"),
      complement: yup.string().required("required"),
      neighborhood: yup.string().required("required"),
    }),
  }),
  yup.object().shape({
    phoneNumber: yup.string().required("required"),
    paymentForm: yup.string().required("required"),
    payment: yup.string().required("required"),
  }),
];

const stripePromise = loadStripe(
  "pk_test_51KYJj3IFVJyNdgHHko9zIuNNoczoAU90ZBzKSismDGq1py68HRolG8JxR72CvdiZBpoPJOk8Ivb19kPyZT2XbJi300U1iLnSES"
);

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state: MyState) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values: any, actions: any) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values: any) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box width="80%" m="60px auto" paddingY={5}>
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {!isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    VOLTAR
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "PR??XIMO" : "ORDEM DE PAGAMENTO"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export { Checkout };
