import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post('/post')
  create(@Body(new ValidationPipe({ transform: true })) createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('/get')
  findAll() {
    return this.employeeService.findAll();
  }

  @Get('/salary/:position')
  findAverageSalary(@Param('position') param) {
    return this.employeeService.findAverageSalary(param)
  }

  @Get('/top-earner/:num')
  findTopEarner(@Param('num') param) {
    return this.employeeService.findTopEarner(param)
  }

  @Delete('/:id')
  delete(@Param('id') param) {
    return this.employeeService.delete(param)
  }

  //small num in first param
  @Get('/salary-range/:num1/:num2')
  findSalaryRange(@Param('num1') num1, @Param('num2') num2) {
    return this.employeeService.findSalaryRange(num1, num2)
  }

  @Get('/retention-rate/:employeeAtStart/:employeeAtEnd/:employeeWhoLeft')
  findRetentionRate(
    @Param('employeeAtStart') employeeAtStart,
    @Param('employeeAtEnd') employeeAtEnd,
    @Param('employeeWhoLeft') employeeWhoLeft
  ) {
    return this.employeeService.findRetentionRate(employeeAtEnd, employeeAtStart, employeeWhoLeft)
  }

}
