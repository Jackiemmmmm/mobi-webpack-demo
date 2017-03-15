const defaultState = {
  bits: '0',
  sendData: {
    title: '-',
    num: '-',
    image: '-',
    currency: '-',
  }
}

const Withdraw = (state = defaultState, action) => {
  console.log(action, 'reducer');
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
