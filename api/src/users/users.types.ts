export type FindByIdResponse = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null;
