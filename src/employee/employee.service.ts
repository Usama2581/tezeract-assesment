import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { EmployeeDocument, EmployeeModel } from './schema/employee.schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class EmployeeService {

  constructor(@InjectModel(EmployeeModel) private employee: Model<EmployeeDocument>) { }

  create(createEmployeeDto) {
    return this.employee.create(createEmployeeDto)
  }

  findAll() {
    return this.employee.find()
  }

  async findAverageSalary(param) {
    let sum = 0
    const result = await this.employee.find({ position: param })

    if (result.length === 0) {
      throw new NotFoundException(`Position ${param} not found`)
    }
    else {
      let salary = result.map(item => item.salary)

      for (let i = 0; i < salary.length; i++) {
        sum = sum + salary[i]
      }

      let average = sum / salary.length

      return { message: `average salary of ${param} is ${average}` }
    }
  }

  async findTopEarner(param) {

    return await this.employee.find({}).sort({ salary: -1 }).limit(param)

  }

  async findSalaryRange(num1, num2) {
    // console.log(num1, num2)

    const result = await this.employee.find({
      $and: [
        { salary: { $gt: num1 } },
        { salary: { $lt: num2 } }
      ]
    })
    if (result.length === 0) {
      throw new NotFoundException('Employee of given salary range not found')
    }
    else {
      return result
    }
  }

  delete(id) {
    return this.employee.findByIdAndDelete(id)
  }

  findRetentionRate(employeeAtEnd, employeeWhoLeft, employeeAtStart) {
    const retentionRate = ((employeeAtEnd - employeeWhoLeft) / employeeAtStart) * 100
    return { Retention_Rate: retentionRate }
  }

}
