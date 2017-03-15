const defaultState = {
  bits: '0',
  sendData: {
    title: '-',
    num: '-',
    image: '-',
    currency: '-',
  },
  updateData: [
    {
      title: 'Tony Stark',
      num: 1234,
      image: true,
      currency: 'EUR',
    },
    {
      title: 'Benjamin Button',
      num: 5678,
      image: false,
      currency: 'DOLLER',
    }
  ]
}

const Withdraw = (state = defaultState, action) => {
  const assign = obj => (
    Object.assign({}, state, obj)
  )
  switch (action.type) {
    case 'GO_TO_SEND':
      return assign({
        sendData: action.data
      });
    default:
      return state;
  }
}
export default Withdraw;
