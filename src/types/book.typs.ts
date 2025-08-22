export interface IBook {
  id: string;
  title: string;
  author: string;
  status: "not_started" | "in_progress" | "finished";
  isDeleted: boolean;
  createdAt: Date;
}
