import data from '@ytg/core';

type DemoData = {
  userId: number;
  user: string;
  error: null | Error;
};

const normalTask = () => {
  return new Promise<DemoData>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({
          userId: Math.random(),
          user: 'hello',
          error: null,
        });
      } else {
        reject({
          userId: 0,
          user: '',
          error: new Error('test'),
        });
      }
    }, 1000);
  });
};

export { normalTask };

console.log('data', data + '🐱');
