import { ChangeEvent } from "react";

function currencyMask(event: ChangeEvent<HTMLInputElement>) {
  let value = event.target.value;

  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1, $2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  event.target.value = value;

  return event;
}

export { currencyMask };
