import { IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @MinLength(4)
  username: string;

  @MinLength(6)
  @IsString()
  password: string;
}
