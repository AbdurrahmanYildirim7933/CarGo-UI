import {UserDTO} from "../login/UserDTO";

export class Garage {

  id: number;
  name: string;
  owner:UserDTO;

}
export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'Name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
