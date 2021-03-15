const formatMoney = (amount = 0) => {
  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  };

  if (amount % 100) {
    options.minimumFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat('en-GB', options);

  return formatter.format(amount);
};

export default formatMoney;
