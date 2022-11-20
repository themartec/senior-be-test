import { SendReportsJob } from './jobs';

const job = new SendReportsJob();
job.create({xxx: 111})
  .then(() =>{
    console.log('Jobs created!')
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });