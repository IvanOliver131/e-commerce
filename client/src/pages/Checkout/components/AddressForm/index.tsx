import { getIn } from "formik";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

interface AddressFormProps {
  type: any;
  values: any;
  touched: any;
  errors: any;
  handleBlur: any;
  handleChange: any;
}

function AddressForm({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}: AddressFormProps) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // these functions allow for better code readability
  const formattedName = (field: string) => `${type}.${field}`;

  const formattedError = (field: string) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field: string) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="Nome"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={formattedName("name")}
        error={formattedError("name")}
        helperText={formattedHelper("name")}
        sx={{ gridColumn: "span 4" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Rua"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street}
        name={formattedName("street")}
        error={formattedError("street")}
        helperText={formattedHelper("street")}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Complemento"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.complement}
        name={formattedName("complement")}
        error={formattedError("complement")}
        helperText={formattedHelper("complement")}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Número"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.number}
        name={formattedName("number")}
        error={formattedError("number")}
        helperText={formattedHelper("number")}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Bairro"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.neighborhood}
        name={formattedName("neighborhood")}
        error={formattedError("neighborhood")}
        helperText={formattedHelper("neighborhood")}
        sx={{ gridColumn: "span 1" }}
      />
    </Box>
  );
}

export { AddressForm };
