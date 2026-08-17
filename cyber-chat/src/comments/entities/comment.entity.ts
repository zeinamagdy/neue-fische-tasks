
type Comment = {
  id: number;
  threadId: number;
  author: string;
  body: string;
  createdAt: Date;
};
export const comments: Comment[] = [
  {
    id: 101,
    threadId: 1,
    author: "dev_dave",
    body: "Leveraging React's `use` hook along with suspended boundaries made a huge difference for our initial page loads.",
    createdAt: new Date("2026-08-10T10:05:00Z"),
  },
  {
    id: 102,
    threadId: 1,
    author: "sarah_dev",
    body: "Good point! Did you run into any issues with caching dynamic requests?",
    createdAt: new Date("2026-08-10T10:42:00Z"),
  },
  {
    id: 103,
    threadId: 2,
    author: "elena_tech",
    body: "The biggest win for us was reducing over-fetching on mobile endpoints, though schema maintenance requires extra discipline.",
    createdAt: new Date("2026-08-12T16:20:00Z"),
  },
  {
    id: 104,
    threadId: 3,
    author: "type_wizard",
    body: "Template literal types combined with key remapping in mapped types are insanely powerful for type-safe routing.",
    createdAt: new Date("2026-08-15T12:15:00Z"),
  },
];