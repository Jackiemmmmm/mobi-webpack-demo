export function goToSend(data) {
  console.log(data, 'action');
  return {
    type: 'GO_TO_SEND', data
  }
}
