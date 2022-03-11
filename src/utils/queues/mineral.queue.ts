// import Bull from 'bull';
// import { setQueues, BullAdapter } from 'bull-board';

// import mineralProcess from '../processes/mineral.process';

// // https://optimalbits.github.io/bull

// const mineralQueue = new Bull('mineralQueue', {
//   redis: process.env.REDIS_URL,
// });

// setQueues([new BullAdapter(mineralQueue)]);

// const setMineralQueue = (data: any) => {
//   mineralQueue.add(data, {
//     attempts: 5,
//   });
// };

// mineralQueue.process(mineralProcess);

// export { setMineralQueue };
