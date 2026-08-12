export interface Post {
  title: string;
  imageText: string;
  author: string;
  createdAt: string;
  teaser: string;
  content: string;
}
export const seedPosts: Post[] = [
  {
    title: "Black: The Absence, Not the Presence, of Color",
    imageText: "colorful-umbrella.jpg",
    author: "Peter Parker",
    createdAt: "2026-08-04",
    teaser:
      "Scientifically, black is not a color but rather the absence of all colors, occurring when an object absorbs nearly all light wavelengths instead of reflecting them.",
    content:
      "<p>When you think about the rainbow, you see a vibrant spectrum of hues. But black does not appear in that spectrum the same way red or blue does.</p><p>From a scientific perspective, black is usually the absence of visible light, not a reflected wavelength.</p>",
  },
  {
    title: "Flowers: Nature's Muse for Design",
    imageText: "flowers.jpg",
    author: "Peter Parker",
    createdAt: "2026-08-03",
    teaser:
      "Flowers inspire design with their color palettes, structure, and balance between repetition and variation.",
    content:
      "<p>Designers borrow from flowers all the time: layered composition, contrasting accents, and natural hierarchy.</p>",
  },
  {
    title: "UDesign's Harmony: Core Purpose and Supporting Details",
    imageText: "sailing.jpg",
    author: "Peter Parker",
    createdAt: "2026-08-04",
    teaser:
      "Strong design starts with one clear core idea, then adds supporting details that reinforce it.",
    content:
      "<p>A useful mental model is major and minor elements. Major elements communicate the main point, minor elements support it without stealing focus.</p>",
  },
];

export type BlogEntry = {
  id: number;
  title: string;
  teaser: string;
  author: string;
  createdAt: string;
  image: string;
  content: string;
};
