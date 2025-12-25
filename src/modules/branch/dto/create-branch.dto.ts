import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsPhoneNumber('NP')
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
