const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const intlFormat = (number) => {
  return intl.format(number);
};
