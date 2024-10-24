import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Directory } from './directory.entity';
import { Repository } from 'typeorm';
import { CreateDirectoryDTO, UpdateDirectoryDTO } from './directory.dto';
import { randomUUID } from 'node:crypto';

const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>,
  ) {}

  async create(data: CreateDirectoryDTO) {
    const notEmail = data.emails.find(e => !emailRegExp.test(e))
        if (notEmail)
            throw new HttpException('The email: ' + notEmail + ' is not an email', 400)
    return this.directoryRepository.insert(
      this.directoryRepository.create({
        ...data,
        id: randomUUID(),
      }),
    );
  }

  update(id: string, data: UpdateDirectoryDTO) {
    const notEmail = data.emails?.find(e => !emailRegExp.test(e))
        if (notEmail)
            throw new HttpException('The email: ' + notEmail + ' is not an email', 400)
    return this.directoryRepository.update(
      {
        id,
      },
      data,
    );
  }

  delete(id: string) {
    return this.directoryRepository.delete({
      id,
    });
  }

  getById(id: string) {
    return this.directoryRepository.findOneBy({
      id,
    });
  }

  async getPaginated(page: number, perPage: number) {
    const data = await this.directoryRepository.find({
      take: perPage,
      skip: (page - 1) * perPage,
    });
    const count = await this.directoryRepository.count();
    const maxPage = Math.ceil(count / perPage);
    const nextPage = maxPage <= page ? maxPage : page + 1;
    const previousPage = page <= 1 ? 1 : page - 1;
    return {
      count,
      nextPage,
      previousPage,
      results: data,
    };
  }
}
