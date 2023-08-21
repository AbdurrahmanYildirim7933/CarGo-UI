import {UserDTO} from "../login/UserDTO";
import {Car} from "./car";

export class Garage {

  id: number;
  name: string;
  owner:UserDTO;
  cars : Car[];

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
