import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'common/db/entities/user.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { userDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async insertUsers(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData: IUser[] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName],
    );

    let debts = 0;
    Promise.all(
      sheetData.map(async (i) => {
        const user = this.user.create(i);
        this.user.save(user);

        debts += i.debt;
      }),
    );
    const usersWithDebt = sheetData.filter((i) => i.debt > 0);
    const data = {
      usersCount: sheetData.length,
      usersWithDebt: usersWithDebt.length,
      debts: debts,
    };

    return data;
  }

  async createUser(dto: userDto) {
    const user = this.user.create(dto);
    await this.user.save(user);

    return user;
  }

  async getUsers() {
    const users = await this.user.find();
    return {
      usersCount: users.length,
      users,
    };
  }

  async removeUser(id: string) {
    const user = await this.user.findOneBy({ id });
    const debt = user.debt;

    await this.user.delete(id);
    return debt;
  }
}
