import { IsString, IsNotEmpty } from "class-validator";

export class Auth {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}