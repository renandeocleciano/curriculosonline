import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  ValidateNested,
} from "class-validator";

export class User {
  _id!: string;
  email!: string;
  password!: string;
  personalInfo: any;
}

export class PersonalInfo {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  lastName!: string;

  birthDay: any;
}

export type UserDTOCreate = Pick<
  User,
  "_id" | "email" | "password" | "personalInfo"
>;

export class UserDTOCreateAPI
  implements Pick<User, "email" | "password" | "personalInfo">
{
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;

  @ValidateNested()
  personalInfo!: PersonalInfo;
}

export class UserDTOLoginAPI implements Pick<User, "email" | "password"> {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;
}
