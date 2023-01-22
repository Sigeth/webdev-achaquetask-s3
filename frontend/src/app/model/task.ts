export interface Task {
  _id?: string;
  title: string;
  finished: boolean;
  status: string;
  listId: string | undefined;
}
