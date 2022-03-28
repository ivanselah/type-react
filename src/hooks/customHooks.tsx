import { useEffect, useState } from 'react';

const name = 'ivan',
  age = 24,
  gender = 'mele';

const useFetch = (url: string) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setDataList)
      .catch((error) => console.log(error));
  }, [url]);

  return dataList;
};

export function CustomHooks() {
  const dataList = useFetch('https://jsonplaceholder.typicode.com/users');
  console.log(dataList);
  return (
    <div>
      <h1>Custom</h1>
      <TestHooks />
    </div>
  );
}

const id = 1;

function TestHooks() {
  const detailData = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  console.log(detailData);
  return (
    <div>
      <h2>Good</h2>
    </div>
  );
}

function getBanana() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('🍌');
    }, 1000);
  });
}

function getWatermelon() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('🍉');
    }, 3000);
  });
}

async function getFruits() {
  const banana = await getBanana();
  const watermelon = await getWatermelon();
  return [banana, watermelon];
}
getFruits().then(console.log);

const dog = { name: '멍멍', emoji: '🦮' };

console.log(Object.keys(dog));
console.log(Object.values(dog));
console.log(Object.entries(dog));

console.log('name' in dog);
console.log(dog.hasOwnProperty('name'));

const temp = Object.getOwnPropertyDescriptors(dog);
console.log(temp);

Object.defineProperty(dog, 'name', {
  value: '안되',
  writable: false,
  enumerable: false,
  configurable: false,
});
