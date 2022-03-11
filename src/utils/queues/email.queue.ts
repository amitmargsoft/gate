// import Bull from 'bull';
// import { setQueues, BullAdapter } from 'bull-board';

// import emailProcess from '../processes/email.process';

// // https://optimalbits.github.io/bull

// const emailQueue = new Bull('email', {
//   redis: process.env.REDIS_URL,
// });

// setQueues([new BullAdapter(emailQueue)]);

// emailQueue.process(emailProcess);

// const sendNewEmail = (data: any) => {
//   emailQueue.add(data, {
//     attempts: 5,
//   });
// };

// export { sendNewEmail };
