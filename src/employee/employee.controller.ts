import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
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

  @Get('/average-salary/:position')
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
  @Get('/salary-range')
  findSalaryRange(@Query('lessThan') lessThan, @Query('greaterThan') greaterThan) {
    return this.employeeService.findSalaryRange(lessThan, greaterThan)
  }

  @Get('/retention-rate')
  findRetentionRate(
    @Query('employeeAtStart') employeeAtStart,
    @Query('employeeAtEnd') employeeAtEnd,
    @Query('employeeWhoLeft') employeeWhoLeft
  ) {
    return this.employeeService.findRetentionRate(employeeAtStart, employeeAtEnd, employeeWhoLeft)
  }

  @Get('/experience')
  findByExperience(@Query('lessThan') lessThan, @Query('greaterThan') greateerThan) {
    return this.employeeService.findByExperience(lessThan, greateerThan)
  }

}
