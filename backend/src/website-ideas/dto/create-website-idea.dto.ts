import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateWebsiteIdeaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Website idea must be at least 5 characters long' })
  @MaxLength(500, { message: 'Website idea must not exceed 500 characters' })
  idea: string;
} 