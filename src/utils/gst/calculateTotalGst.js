// function calculateGST(items) {
//   const categoryWiseCGST = {};
//   const categoryWiseSGST = {};
//   const categoryWiseQuantity = {};
//   let total = 0;
//   //   {"_id": "65f70a3aeefd779738f6e510", "category": "1900", "cgst": 1, "discountPercentage": 0, "name": "boo", "originalPrice": 12, "price": 12, "quantity": 4, "sgst": 1, "unit": "add new"}
//   items.forEach(item => {
//     console.log(item);
//     const price = parseFloat((item.price * item.quantity).toFixed(2));
//     const cgst = parseFloat(item.cgst.toFixed(2)) || 0;
//     const sgst = parseFloat(item.sgst.toFixed(2)) || 0;
//     const quantity = item.quantity;

//     const cgstAmount = parseFloat(((price * cgst) / 100).toFixed(2));
//     const sgstAmount = parseFloat(((price * sgst) / 100).toFixed(2));

//     categoryWiseCGST[cgst.toString()] ??= 0;
//     categoryWiseSGST[sgst.toString()] ??= 0;
//     categoryWiseQuantity[cgst.toString()] ??= 0;

//     categoryWiseCGST[cgst.toString()] =
//       (categoryWiseCGST[cgst.toString()] || 0) + cgstAmount;
//     categoryWiseSGST[sgst.toString()] =
//       (categoryWiseSGST[sgst.toString()] || 0) + sgstAmount;
//     categoryWiseQuantity[cgst.toString()] =
//       (categoryWiseQuantity[cgst.toString()] || 0) + quantity;
//   });

//   console.log('Category-wise CGST:');
//   Object.entries(categoryWiseCGST).forEach(([category, cgst]) => {
//     const quantity = categoryWiseQuantity[category] || 0;
//     console.log(`CGST ${category}% (Quantity: ${quantity}): ${cgst}`);
//     total += cgst;
//   });

//   console.log('\nCategory-wise SGST:');
//   Object.entries(categoryWiseSGST).forEach(([category, sgst]) => {
//     const quantity = categoryWiseQuantity[category] || 0;
//     total += sgst;
//     console.log(`SGST ${category}% (Quantity: ${quantity}): ${sgst}`);
//   });
//   console.log(total);
//   return total;
// }

function calculateGST(items) {
  const categoryWiseCGST = {};
  const categoryWiseSGST = {};
  const categoryWiseQuantity = {};
  let gstData = [];
  let gstTotal = 0;

  for (const item of items) {
    if (item.cgst == 0 || item.sgst == 0) {
      continue;
    }
    const price = parseFloat((item.price || 0) * item.quantity).toFixed(2);
    const cgst = parseFloat(item.cgst || 0).toFixed(2);
    const sgst = parseFloat(item.sgst || 0).toFixed(2);
    const quantity = item.quantity;

    const cgstAmount = parseFloat(((price * cgst) / 100).toFixed(2));
    const sgstAmount = parseFloat(((price * sgst) / 100).toFixed(2));

    categoryWiseCGST[cgst.toString()] ??= 0;
    categoryWiseSGST[sgst.toString()] ??= 0;
    categoryWiseQuantity[cgst.toString()] ??= 0;
    categoryWiseQuantity[sgst.toString()] ??= 0;

    categoryWiseCGST[cgst.toString()] =
      (categoryWiseCGST[cgst.toString()] || 0) + cgstAmount;
    categoryWiseSGST[sgst.toString()] =
      (categoryWiseSGST[sgst.toString()] || 0) + sgstAmount;

    categoryWiseQuantity[cgst.toString()] =
      (categoryWiseQuantity[cgst.toString()] || 0) + quantity;
    if (cgst.toString() === sgst.toString()) {
      continue;
    }
    categoryWiseQuantity[sgst.toString()] =
      (categoryWiseQuantity[sgst.toString()] || 0) + quantity;
  }

  // console.log('Category-wise CGST:');
  Object.entries(categoryWiseCGST).forEach(([category, cgst]) => {
    const quantity = categoryWiseQuantity[category] || 0;
    // console.log(`CGST ${category}% (Quantity: ${quantity}): ${cgst}`);
    gstTotal += cgst;
    // console.log('CGST', quantity.toString(), `${category}%`, cgst.toString());
    gstData = [
      ...gstData,
      {
        type: 'CGST',
        quantity: quantity.toString(),
        percent: `${category}%`,
        total: cgst.toString(),
      },
    ];
  });

  // console.log('\nCategory-wise SGST:');
  Object.entries(categoryWiseSGST).forEach(([category, sgst]) => {
    const quantity = categoryWiseQuantity[category] || 0;
    // console.log(`SGST ${category}% (Quantity: ${quantity}): ${sgst}`);
    gstTotal += sgst;
    // console.log('SGST', quantity.toString(), `${category}%`, sgst.toString());
    gstData = [
      ...gstData,
      {
        type: 'SGST',
        quantity: quantity.toString(),
        percent: `${category}%`,
        total: sgst.toString(),
      },
    ];
  });

  // console.log(gstData);
  return {gstTotal, gstData};
}

export default calculateGST;
