export class Thread {
  id: string;
  title: string;
  author?: string | null;
  body: string;
  createdAt: Date;
}
export const threads: Thread[] = [
  {
    id: "1",
    title: 'Best practices for React 19 server components',
    author: 'sarah_dev',
    body: 'What patterns are you using to manage asynchronous data fetching without triggering unnecessary re-renders?',
    createdAt: new Date('2026-08-10T09:15:00Z'),
  },
  {
    id: "2",
    title: 'Migrating from REST to GraphQL in 2026',
    author: 'alex_backend',
    body: 'We are considering migrating our core API. Has anyone experienced significant performance gains with modern subscriptions?',
    createdAt: new Date('2026-08-12T14:30:00Z'),
  },
  {
    id: "3",
    title: 'TypeScript 5.x tips and hidden gems',
    author: 'mario_code',
    body: 'Share your favorite strict type tricks or lesser-known compiler options!',
    createdAt: new Date('2026-08-15T11:00:00Z'),
  },
];
