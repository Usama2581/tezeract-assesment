import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeModel, EmployeeSchema } from './schema/employee.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: EmployeeModel, schema: EmployeeSchema }])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule { }
