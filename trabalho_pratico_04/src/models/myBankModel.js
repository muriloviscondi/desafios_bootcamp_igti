export default (mongoose) => {
  const schema = mongoose.Schema({
    agencia: {
      type: Number,
      Required: true,
    },
    conta: {
      type: Number,
      Required: true,
    },
    name: {
      type: String,
      Required: true,
    },
    balance: {
      type: { Number, min: 0 },
      Required: true,
    },
  });

  const myBank = mongoose.model('my_bank_api', schema, 'my_bank_api');

  return myBank;
};
