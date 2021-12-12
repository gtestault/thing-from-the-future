import {IsAlphanumeric} from "class-validator";

export class NewPlayerDTO {
   @IsAlphanumeric()
   username: string;
}
