export default function paymentValidate (values) {
  let errors = {};

  if (!values.cardholderName) {
    errors.cardholderName = 'Please enter a name';
  }

  if (!values.newCCNumber) {
    errors.newCCNumber = 'Please enter a valid credit card number';
  }

  if (!values.newCCV) {
    errors.newCCV = 'Please enter a valid CCV number';
  } else if (!values.newCCV.length === 4 || !values.newCCV.length === 3) {
    errors.newCCV = 'CCV is a 3-digit or 4-digit number';
  }

  if (!values.zipCode) {
    errors.zipCode = 'Please enter a valid zip code';
  } else if (!values.zipCode.length === 5) {
    errors.zipCode = 'Not a valid zip code';
  }

  if (values.newCCType === '-') {
    errors.newCCType = 'Select a card type';
  }

  return errors;
}