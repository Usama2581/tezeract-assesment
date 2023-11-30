// import { Schema } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Employee {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    position: string;

    @Prop({ required: true })
    salary: number;

    @Prop({ required: true, type: Date })
    joiningDate: Date;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)
export const EmployeeModel = 'Employee'
export type EmployeeDocument = Employee & Document
