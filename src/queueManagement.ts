import Queue from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

//bull-queues management

export class QueueManagement {
  public app;
  public mineralQueue;
  public dssQueue;
  constructor(app) {
    this.app = app;

    this.mineralQueue = new Queue(process.env.AI_QUEUE_NAME);
    this.dssQueue = new Queue(process.env.WEB_DSS_QUEUE_NAME);
    const { router } = createBullBoard([new BullAdapter(this.mineralQueue), new BullAdapter(this.dssQueue)]);
    this.app.use(process.env.AI_QUEUE_URL, router);

    this.mineralQueueStore();
    this.dssQueueStore();
  }

  mineralQueueStore() {
    this.mineralQueue.on('completed', (job, result) => {
      console.log(`Job ${job} completed with result `, result);
      job.remove();
    });

    this.mineralQueue.on('error', function (error) {
      console.log(`Job error with result `, error);
    });

    this.mineralQueue.on('waiting', function (jobId) {
      console.log(`Job is in waiting state `, jobId);
      // jobId.retry();
    });
  }

  dssQueueStore() {
    this.dssQueue.on('completed', (job, result) => {
      console.log(`Job ${job} completed with result `, result);
      job.remove();
    });

    this.dssQueue.on('error', function (error) {
      console.log(`Job error with result `, error);
    });

    this.dssQueue.on('waiting', function (jobId) {
      console.log(`Job is in waiting state `, jobId);
      // jobId.retry();
    });
  }
}
