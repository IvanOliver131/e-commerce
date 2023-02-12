import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

import { useSelector } from "react-redux";
import { currencyMask } from "../../../../utils/currencyMask";

interface PaymentProps {
  values: any;
  touched: any;
  errors: any;
  handleBlur: any;
  handleChange: any;
}

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

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Payment({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}: PaymentProps) {
  const cart = useSelector((state: MyState) => state.cart.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Contato"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />

        <FormControl
          fullWidth
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        >
          <InputLabel id="demo-simple-select-label">
            Forma de pagamento
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Forma de pagamento"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.paymentForm}
            name="paymentForm"
            error={!!touched.paymentForm && !!errors.paymentForm}
          >
            <MenuItem value={1}>Cartão</MenuItem>
            <MenuItem value={2}>Dinheiro</MenuItem>
            <MenuItem value={3}>PIX</MenuItem>
          </Select>
        </FormControl>

        {values.paymentForm === 2 && (
          <TextField
            fullWidth
            type="text"
            label="Pagamento"
            onBlur={handleBlur}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(currencyMask(event))
            }
            value={values.payment}
            name="payment"
            error={!!touched.payment && !!errors.payment}
            helperText={touched.payment && errors.payment}
            sx={{ gridColumn: "span 4", marginBottom: "15px" }}
          />
        )}
      </Box>

      <FlexBox m="20px 0">
        <Typography fontWeight="bold">SUBTOTAL</Typography>
        <Typography fontWeight="bold">
          {totalPrice.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>
      </FlexBox>
    </Box>
  );
}

export { Payment };
