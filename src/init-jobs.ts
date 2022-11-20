import { SendReportsJob } from './jobs';

// create send reports email job
const job = new SendReportsJob();
job.create({}, { repeat: { pattern: '0 */3 * ? * *' }})
  .then(() =>{
    console.log('Jobs created!')
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });