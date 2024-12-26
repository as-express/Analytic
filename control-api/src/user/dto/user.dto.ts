import { IsNotEmpty } from 'class-validator';

export class userDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  debt: number;
}
