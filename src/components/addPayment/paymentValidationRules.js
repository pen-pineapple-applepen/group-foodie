export default function paymentValidate (values) {
  let errors = {};

  if (!values.cardholderName) {
    errors.cardholderName = 'Please enter a name';
  }

  if (!values.newCCNumber) {
    errors.newCCNumber = 'Please enter a valid credit card number';
  } else if (values.newCCNumber.length > 9) {
    errors.newCCNumber = 'Card length is too long';
  }

  if (!values.newCVV) {
    errors.newCVV = 'Please enter a valid CCV number';
  }

  if (!values.newCCExpiry) {
    errors.newCCExpiry = 'Please enter the card expiry date';
  } else if (!values.newCCExpiry.includes('/')) {
    errors.newCCExpiry = 'Please enter expiry date as MM/YY'
  }

  if (!values.zipCode) {
    errors.zipCode = 'Please enter a valid zip code';
  } else if (values.zipCode.length !== 5) {
    errors.zipCode = 'Not a valid zip code';
  }

  if (values.newCCType === '-') {
    errors.newCCType = 'Select a card type';
  }

  return errors;
}