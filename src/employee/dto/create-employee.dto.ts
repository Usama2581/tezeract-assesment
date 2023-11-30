import { Transform, Type } from "class-transformer";
import { IsDataURI, IsDate, IsDateString, IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    position: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    salary: number;
    
    @Type(() => Date)
    @Transform(value => value.valueOf(), { toPlainOnly: true })
    date: Date;
}
