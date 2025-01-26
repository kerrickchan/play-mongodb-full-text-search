export class Item {
  id: string = Math.random().toString(36).substring(2, 9);
  created_at: Date = new Date();
  updated_at: Date = new Date();

  constructor(
    public text: string,
  ) {}
}
