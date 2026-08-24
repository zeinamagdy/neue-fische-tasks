import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  username: string;

  @IsNotEmpty()
  password: string;
}
