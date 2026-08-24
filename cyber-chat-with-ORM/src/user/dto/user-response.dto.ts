import { Expose,Exclude } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Exclude()
  passwordHash: string;
}
