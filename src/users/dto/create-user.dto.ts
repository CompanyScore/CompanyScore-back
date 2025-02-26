import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Position } from 'src/constants';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'some-refresh-token',
    description: 'Refresh token for the user (optional)',
  })
  refreshToken?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user', description: 'The role of the user' })
  role?: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'linkedin-12345',
    description: 'LinkedIn ID of the user',
  })
  linkedinId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({
    example: 'file/users/avatars/avatar.png',
    description: 'Avatar URL for the user (optional)',
  })
  avatar?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Position, {
    message: `Должность должна быть: ${Position.join(', ')}`,
  })
  @ApiProperty({
    example: 'Full-stack',
    enum: Position,
    description: 'User position',
  })
  position?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'A brief description about the user',
    description: 'User description',
  })
  description?: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Creation date of the user',
    type: String,
    format: 'date-time',
  })
  createDate?: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2023-12-31T23:59:59.999Z',
    description: 'Deletion date of the user',
    type: String,
    format: 'date-time',
  })
  deleteDate?: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Flag indicating whether the user is deleted',
  })
  isDeleted?: boolean;
}
