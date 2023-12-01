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

  async findSalaryRange(lessThan, greaterThan) {

    const result = await this.employee.find({
      $and: [
        { salary: { $gt: greaterThan } },
        { salary: { $lt: lessThan } }
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

  findRetentionRate(employeeAtStart, employeeAtEnd, employeeWhoLeft) {

    const tempRetentionRate = ((employeeAtEnd - employeeWhoLeft) / employeeAtStart) * 100
    return { Retention_Rate: tempRetentionRate }

  }

  async findByExperience(lessThan, greaterThan) {

    let employees = []
    const result = await this.employee.find()

    if (result.length === 0) {
      throw new NotFoundException('Employees not found.')
    }
    else {
      
      for (let i = 0; i < result.length; i++) {
        
        const currentDate: Date = new Date()
        const joiningDate: Date = new Date(result[i].joiningDate);
        const difference: number = currentDate.getTime() - joiningDate.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))

        if (days < lessThan * 365 && days > greaterThan * 365) {
          console.log(days)
          employees.push(result[i])
        }
      }
    }

    if (employees.length === 0) {
      throw new NotFoundException('Employees with the experience given not found.')
    }
    else {
      return employees
    }
  }

}
