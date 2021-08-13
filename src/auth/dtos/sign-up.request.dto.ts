import { IsEmail, IsString, MinLength } from 'class-validator';
import buildDto from '../../helpers/functions/build-dto.fn';

interface IBuildSignUpRequestDto {
  username: string;
  password: string;
  email: string;
}

export class SignUpRequestDto {
  @MinLength(4)
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  static async toDto(data: IBuildSignUpRequestDto): Promise<SignUpRequestDto> {
    return buildDto(SignUpRequestDto, data);
  }
}