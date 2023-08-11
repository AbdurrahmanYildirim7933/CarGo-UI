import {UserDTO} from "../login/UserDTO";
import {Car} from "./car";

export class Garage{
id: bigint;
name: string;
owner: UserDTO;
cars: Car[];
}
