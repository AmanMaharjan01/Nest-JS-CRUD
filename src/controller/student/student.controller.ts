import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IStudent } from 'src/interface/student.interface';
import { StudentService } from 'src/services/student/student.service';

@Controller('students')
export class StudentController {
  Students = [];

  constructor(private readonly studentservice: StudentService) {}

  @Get()
  findAll(): Promise<IStudent[]> {
    return this.studentservice.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<IStudent> {
    return this.studentservice.find(id);
  }

  @Post()
  create(@Body() request: IStudent): Promise<IStudent> {
    return this.studentservice.create(request);
  }

  @Put(':id')
  update(
    @Body() request: IStudent,
    @Param('id') id: string,
  ): Promise<IStudent> {
    return this.studentservice.update(id, request);
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return this.studentservice.delete(id);
  }
}
