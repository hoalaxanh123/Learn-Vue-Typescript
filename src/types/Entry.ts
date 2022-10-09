import type { Emoji } from "./Emoji";
export default interface Entry {
  id: number;
  createAt: Date;
  body: string;
  emoji: Emoji | null;
  author: number;
}
