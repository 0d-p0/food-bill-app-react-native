const dummyfood = [
  {
    id: 1,
    name: 'food',
    price: 10,
  },
  {
    id: 2,
    name: 'food2',
    price: 120,
  },
  {
    id: 3,
    name: 'food3',
    price: 90,
  },
];

const orderList={}
if(id==1){
  
}

// const dummydata = {
//   123: 1,
//   234: 2,
//   456: 1,
// };

// const id = '1323';
// if (dummydata[id] != null) {
//   dummydata[id]++;
// } else {
//   dummydata[id] = 1;
// }

// console.log(dummydata)

// const {dummyFoodList} = require('./demoData');
// // Group foods by category
// const groupedFoods = dummyFoodList.reduce((acc, food) => {
//   // Check if the category already exists in the accumulator
//   if (!acc[food.category]) {
//     // If not, create a new array for the category
//     acc[food.category] = [];
//   }
//   // Push the food object into the corresponding category array
//   acc[food.category].push(food);
//   return acc;
// }, {});

// // Now, groupedFoods is an object where each key is a category and its value is an array of foods in that category

// console.log(groupedFoods);

// const foodUnits = [
//   '65f0a497e9f89e6a4622ad8c',
//   '65f0a497e9f89e6a4622ad8e',
//   '65f0a497e9f89e6a4622ad90',
//   '65f0a497e9f89e6a4622ad92',
//   '65f0a497e9f89e6a4622ad94',
//   '65f0a497e9f89e6a4622ad96',
//   '65f0a497e9f89e6a4622ad98',
//   '65f0a497e9f89e6a4622ad9a',
//   '65f0a497e9f89e6a4622ad9c',
//   '65f0a497e9f89e6a4622ad9e',
//   '65f0a497e9f89e6a4622ada0',
//   '65f0a497e9f89e6a4622ada2',
//   '65f0a497e9f89e6a4622ada4',
//   '65f0a497e9f89e6a4622ada6',
//   '65f0a497e9f89e6a4622ada8',
//   '65f0a497e9f89e6a4622adaa',
//   '65f0a497e9f89e6a4622adac',
//   '65f0a497e9f89e6a4622adae',
//   '65f0a497e9f89e6a4622adb0',
//   '65f0a497e9f89e6a4622adb2',
// ];

// const foodCategories = [
//   '65f0a3c8e9f89e6a4622ac3f',
//   '65f0a3c8e9f89e6a4622ac41',
//   '65f0a3c8e9f89e6a4622ac43',
//   '65f0a3c8e9f89e6a4622ac45',
//   '65f0a3c8e9f89e6a4622ac47',
//   '65f0a3c8e9f89e6a4622ac49',
//   '65f0a3c8e9f89e6a4622ac4b',
//   '65f0a3c8e9f89e6a4622ac4d',
//   '65f0a3c8e9f89e6a4622ac4f',
//   '65f0a3c8e9f89e6a4622ac51',
//   '65f0a3c8e9f89e6a4622ac53',
//   '65f0a3c8e9f89e6a4622ac55',
//   '65f0a3c8e9f89e6a4622ac57',
//   '65f0a3c8e9f89e6a4622ac59',
//   '65f0a3c8e9f89e6a4622ac5b',
//   '65f0a3c8e9f89e6a4622ac5d',
//   '65f0a3c8e9f89e6a4622ac5f',
//   '65f0a3c8e9f89e6a4622ac61',
//   '65f0a3c8e9f89e6a4622ac63',
//   '65f0a3c8e9f89e6a4622ac65',
// ];

// const generateRandomItem = () => {
//   const selectedUnit = foodUnits[Math.floor(Math.random() * foodUnits.length)];
//   const selectedCategory =
//     foodCategories[Math.floor(Math.random() * foodCategories.length)];
//   const foodName = `Food ${Math.floor(Math.random() * 1000)}`;
//   const foodPrice = (Math.random() * (100 - 1) + 1).toFixed(2);
//   const foodCGST = (Math.random() * (10 - 1) + 1).toFixed(2);
//   const foodSGST = (Math.random() * (10 - 1) + 1).toFixed(2);

//   return {
//     foodName,
//     foodPrice,
//     foodUnit: selectedUnit,
//     foodCategory: selectedCategory,
//     cgst: foodCGST,
//     sgst: foodSGST,
//   };
// };

// const generateFoodItems = () => {
//   const foodItems = [];
//   for (let i = 0; i < 100; i++) {
//     foodItems.push(generateRandomItem());
//   }
//   return foodItems;
// };

// const foodItems = generateFoodItems();
// console.log(JSON.stringify(foodItems));

// const date = new Date('2024-03-08T14:32:04.920Z');

// const formattedDate = date.toLocaleDateString().replace(/\//g, '-');

// console.log(formattedDate);

// const foodList = [
//   {
//     _id: '65e719e50dc98b8ea3d27514',
//     category: 'Dinner',
//     cgst: 5,
//     name: 'Biriyani',
//     price: 96,
//     quantity: 4,
//     sgst: 5,
//     unit: 'Plate',
//   },
//   {
//     _id: '65e71a150dc98b8ea3d27552',
//     category: 'Lunch',
//     cgst: 1,
//     name: 'Vat change',
//     price: 25,
//     quantity: 0,
//     sgst: 1,
//     unit: 'Plate',
//   },
//   {
//     _id: '65e847c9bab321c2f4408c85',
//     category: 'Lunch',
//     cgst: 2,
//     name: 'rosgolla',
//     price: 10,
//     quantity: 0,
//     sgst: 2,
//     unit: 'Plate',
//   },
// ];

// const newfood = foodList.map(item => {
//   return {...item, quantity: 0};
// });

// console.log(newfood);
// const foodList = [
//   {
//     _id: '65e719e50dc98b8ea3d27514',
//     category: 'Dinner',
//     cgst: 5,
//     name: 'Biriyani',
//     price: 96,
//     quantity: 5,
//     sgst: 5,
//     unit: 'Plate',
//   },
//   {
//     _id: '65e71a150dc98b8ea3d27552',
//     category: 'Lunch',
//     cgst: 1,
//     name: 'Vat change',
//     price: 25,
//     quantity: 0,
//     sgst: 1,
//     unit: 'Plate',
//   },
// ];

// const orderList = foodList.filter(item => item.quantity != 0);

// console.log(orderList);

// const categoryList = [
//   {_id: '65e5f1c16318dc0588c43658', name: 'Test'},
//   {_id: '65b54a4947228f65c4e74ff9', name: 'Dinner'},
//   {_id: '65b54c8247228f65c4e750a7', name: 'Lunch'},
// ];
// const newCategory = {
//   categoryid: {
//     __v: 0,
//     _id: '65e6e6a6a2e7b79084a0b073',
//     createdAt: '2024-03-05T09:32:22.639Z',
//     foods: [],
//     name: 'Lunch change ',
//     updatedAt: '2024-03-05T09:39:31.623Z',
//   },
//   message: 'Category Edited Successfully',
//   success: true,
// };

// const slectedCategory = '65b54c8247228f65c4e750a7';

// const newData = categoryList.map(item => {
//   if (item._id == slectedCategory) {
//     (item._id = newCategory.categoryid._id),
//       (item.name = newCategory.categoryid.name);
//   }

//   return item;
// });

// console.log(newData);

// const data = [
//   {label: 'dinner', value: '65b4f6ad5247881412c20366'},
//   {label: 'Lunch', value: '65b54c8247228f65c4e750a7'},
//   {label: 'Break fast', value: '65e49417995142b6273f9546'},
// ];

// const mp = data.filter(item => item.label == 'dinner');

// console.log(mp[0].value);

// const obj = {
//   _id: '65e5cc666318dc0588c42971',
//   cgst: 54,
//   category: {name: 'Break fast'},
//   price: 65,
//   name: 'Vb',
//   sgst: 88,
//   unit: {name: 'Cup'},
//   __v: 0,
//   createdAt: '2024-03-04T13:28:06.896Z',
//   updatedAt: ' 2024-03-04T13:40:53.680Z',
// };

// // Destructuring assignment for cleaner syntax
// const unitName = obj.unit.name;
// const categoryName = obj.category.name;

// // Modify the object using spread syntax
// obj.unit = unitName;
// obj.category = categoryName;

// console.log(obj);

// const obj = {
//   __v: 0,
//   _id: '65e4abe1995142b6273fa199',
//   category: '65e49417995142b6273f9546',
//   cgst: 5,
//   createdAt: '2024-03-03T16:57:05.036Z',
//   name: 'Chowmin',
//   price: 120,
//   sgst: 5,
//   unit: '65b4f6b95247881412c203f9',
//   updatedAt: '2024-03-03T16:57:05.036Z',
// };

// // Remove fields
// delete obj.__v;
// delete obj.createdAt;
// delete obj.updatedAt;

// // Add the quantity field with value 0
// obj.quantity = 0;

// console.log(obj);
// const data = [
//   {
//     _id: '65d8b2832ac115a3b72dda84',
//     category: 'Lunch',
//     cgst: 5,
//     name: 'chicken biryani ',
//     price: 135,
//     sgst: 5,
//     unit: 'plate',
//     quantity: 0,
//   },
//   {
//     _id: '65d8c21e2ac115a3b72ddde4',
//     category: 'dinner',
//     cgst: 8,
//     name: 'egg fry',
//     price: 15,
//     sgst: 8,
//     unit: 'plate',
//     quantity: 0,
//   },
//   {
//     _id: '65d8c22f2ac115a3b72dddf2',
//     category: 'dinner',
//     cgst: 8,
//     name: 'egg roll',
//     price: 50,
//     sgst: 8,
//     unit: 'plate',
//     quantity: 0,
//   },
//   {
//     _id: '65d8c2412ac115a3b72dde01',
//     category: 'dinner',
//     cgst: 5,
//     name: 'chicken curry',
//     price: 80,
//     sgst: 5,
//     unit: 'plate',
//     quantity: 0,
//   },
// ];

// const searchedFood = data.filter(item =>
//   item.name.toLowerCase().startsWith('chicken biryani'),
// );
// console.log(searchedFood);
