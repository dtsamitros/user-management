import { Group } from '../../groups/model/group.model';

export class User {
  id: number;
  name: string = '';
  email: string = '';
  comments?: string = '';
  groupIds: number[] = [];
  groups?: Group[];
}
