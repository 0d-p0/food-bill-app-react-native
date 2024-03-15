export function calculateTotal(data) {
  let totalQuantity = 0;
  let totalPrice = 0;

  data.forEach(item => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  return {totalQuantity, totalPrice};
}
