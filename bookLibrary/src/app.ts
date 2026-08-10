import express from "express";
import {NotificationService,Notifiable} from "./controller.ts/bookcontroller"

const app = express();
const port = Number(process.env.PORT) || 3000;

const notifications: Notifiable[] = [
  {
    memberId: 'MEM123',
    event: 'reservation',
    title: 'TypeScript Guide',
    getChannelName: () => 'email',
    notify: (memberId, event, title) => {
      console.log(`[EMAIL] Sent to ${memberId} regarding "${title}"`);
    }
  },
  {
    memberId: 'MEM123',
    event: 'overdue',
    title: 'Clean Code',
    getChannelName: () => 'sms',
    notify: (memberId, event, title) => {
      console.log(`[SMS] Sent to ${memberId} regarding "${title}"`);
    }
  }
];
const notificationServices = new NotificationService(notifications)
console.log (notificationServices.dispatch("MEM123","overdue","Clean Code"))



 app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });