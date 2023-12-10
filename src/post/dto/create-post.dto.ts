export class CreatePostDto {
  id?: number;
  title: string;
  content: string;
  // authorId: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}
