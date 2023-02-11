import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { AddressForm } from "../AddressForm";

interface ShippingProps {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
  setFieldValue: any;
}

function Shipping({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}: ShippingProps) {
  return (
    <Box m="30px auto">
      {/* BILLING FORM */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>
    </Box>
  );
}

export { Shipping };
