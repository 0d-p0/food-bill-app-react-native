export const validateFoodInputField = inputState => {
  const {
    selectedCategory,
    selectedUnit,
    foodName,
    foodPrice,
    foodCGST,
    foodSGST,
  } = inputState;

  if (!foodName) {
    return {success: false, message: 'Please add Food Name'};
  }

  if (!foodPrice) {
    return {success: false, message: 'Please add Food Price'};
  }

  if (!foodCGST) {
    return {success: false, message: 'Please add Food CGST'};
  }

  if (!foodSGST) {
    return {success: false, message: 'Please add Food SGST'};
  }

  if (!selectedCategory) {
    return {success: false, message: 'Please select Food Category'};
  }

  if (!selectedUnit) {
    return {success: false, message: 'Please add Food Unit'};
  }

  return {success: true, message: 'all done'};
};
