export const filteredList = (list, key, value) => {
  if (!key) {
    return list;
  }
  const newList = list.filter(item => item[key] == value);
  return newList;
};
