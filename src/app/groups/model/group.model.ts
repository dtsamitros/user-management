import { User } from '../../users/model/user.model';

export class Group {
  id: number;
  name: string;
  description?: string;
  users?: User[];
}
