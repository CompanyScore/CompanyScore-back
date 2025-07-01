import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  @IsEmail({}, { message: 'Неверный формат email' })
  email: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @Type(() => String)
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  password: string;
}
