import cron from 'node-cron';
import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';
import { twilioCall } from '../utils/twilio.js';

const updatingTaskPriority = () => {
    cron.schedule('0 * * * * *', async () => {
        const tasks = await Task.find();
        tasks.forEach(async (element) => {
            const dueDate = element.due_date;
            const today = Date.now();
            const haveTime = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

            let priority = 0;
            if (haveTime === 0) {
                priority = 0;
            }
            else if (haveTime >= 1 && haveTime <= 2) {
                priority = 1;
            }
            else if (haveTime >= 3 && haveTime <= 4) {
                priority = 2;
            }
            else if (haveTime >= 5) {
                priority = 3;
            }
            element.priority = priority;
            await element.save();
        });

        console.log("Changed the priority");
    })
}
const callBasedOnUserPriority = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const users = await User.find().sort({ priority: 1 });
            for (const user of users) {
                const tasks = await Task.find({ userId: user._id, priority: 0 });
                for (const task of tasks) {
                    if (user.phone_number) {
                        const answered = await twilioCall(user.phone_number)
                        if(answered==="busy"){
                            console.log("User didn't pick the call")
                         break;
                        }
                    }
                }
            }
        } catch (error) {
            console.log({ error: "Having problem in calling" });
        }
        console.log("schedule done for making a call")
    });
}
export { updatingTaskPriority, callBasedOnUserPriority };