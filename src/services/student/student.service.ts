import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IStudent } from 'src/interface/student.interface';
import { Student } from 'src/models/student.model';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  private students: IStudent[] = [];

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<IStudent[]> {
    return this.studentRepository.find();
  }
  find(id: string): Promise<IStudent> {
    return this.studentRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
  }
  create(request: IStudent): Promise<IStudent> {
    return this.studentRepository.save(this.studentRepository.create(request));
  }
  update(id: string, request: IStudent): any {
    return this.studentRepository
      .createQueryBuilder()
      .update(Student)
      .set({
        ...request,
      })
      .where('id = :id', { id: parseInt(id) })
      .execute();
  }

  delete(id: string): any {
    return this.studentRepository
      .createQueryBuilder()
      .delete()
      .from(Student)
      .where('id = :id', { id: parseInt(id) })
      .execute();
  }
}
