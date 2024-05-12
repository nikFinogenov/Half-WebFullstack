let guestList = new WeakSet();
let menu = new Map();
let bankVault = new WeakMap();
let coinCollection = new Set();

console.log('guestList');
console.log(guestList);
let temp = { name: "tempGuest", age: 123 }
guestList.add(temp);
guestList.add({ name: "guest1", age: 18 });
guestList.add({ name: "guest2", age: 19 });
guestList.add({ name: "guest3", age: 20 });
guestList.add({ name: "guest4", age: 21 });
guestList.add({ name: "guest5", age: 22 });

console.log('add: ' + guestList.has(temp));
console.log('remove: ' + guestList.delete(temp));
console.log('find: ' + guestList.has(temp));
console.log('size: ' + guestList.size);

console.log('\nmenu');
console.log(menu);
menu.set('meal1', 10);
menu.set('meal2', 11);
menu.set('meal3', 12);
menu.set('meal4', 13);
menu.set('meal5', 14);

console.log('add: ' + menu.has('meal1'));
console.log('remove: ' + menu.delete('meal1'));
console.log('find: ' + menu.has('meal1'));
console.log('size: ' + menu.size);
console.log('clear: ' + menu.clear());

console.log('\nbankVault');
console.log(bankVault);
bankVault.set({ name: "guest1", age: 18 }, "00000000");
bankVault.set({ name: "guest2", age: 19 }, "111111");
bankVault.set({ name: "guest3", age: 20 }, "2222222");
bankVault.set({ name: "guest4", age: 21 }, "33333333");
bankVault.set({ name: "guest5", age: 22 }, "321321321");
bankVault.set({ name: "guest6", age: 23 }, "123123123");

console.log('add: ' + bankVault.has({ name: "guest1", age: 18 }));
console.log('remove: ' + bankVault.delete({ name: "guest1", age: 18 }));
console.log('find: ' + bankVault.has({ name: "guest1", age: 18 }));
console.log('size: ' + bankVault.size);

console.log('\ncoinCollection');
console.log(coinCollection);
coinCollection.add({ value: 5, year: 2002 }, "5");
coinCollection.add({ value: 10, year: 2012 }, "10");
coinCollection.add({ value: 15, year: 2022 }, "15");
coinCollection.add({ value: 25, year: 2032 }, "25");
coinCollection.add({ value: 50, year: 2042 }, "50");

console.log('add: ' + coinCollection.has({ value: 5, year: 2002 }));
console.log('remove: ' + coinCollection.delete({ value: 5, year: 2002 }));
console.log('find: ' + coinCollection.has({ value: 5, year: 2002 }));
console.log('size: ' + coinCollection.size);
console.log('clear: ' + coinCollection.clear());
