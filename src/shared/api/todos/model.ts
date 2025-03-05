export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
}