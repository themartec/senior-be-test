import * as yargs from 'yargs'
import Queue from  "./queue"

let args = yargs
    .option('input', {
        alias: 'q',
        demand: true,
        default: "default"
    }).argv;
const commandArgs = args["q"].split(",");
for (let i = 0; i < commandArgs.length; i++) {
    Queue.process({
        queueName: commandArgs[i],
    });
}