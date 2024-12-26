import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'common/db/entities/product.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { productDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}

  async insertProducts(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData: IProduct[] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName],
    );

    Promise.all(
      sheetData.map(async (i) => {
        const item = this.product.create(i);
        await this.product.save(item);
      }),
    );

    const totalProfit = sheetData.reduce((a, b) => a + b.price, 0);
    const totalSales = sheetData.reduce((a, b) => a + b.saled, 0);
    const warehouseProducts = sheetData.reduce((a, b) => a + b.quantity, 0);
    const totalQuantity = totalSales + warehouseProducts;
    const totalProductType = sheetData.length;

    const result = {
      totalProfit,
      totalSales,
      warehouseProducts,
      totalProductType,
      totalQuantity,
    };

    const data = {
      totalProductType: result.totalProductType,
      totalQuantity: result.totalQuantity,
      totalProfit: result.totalProfit,
      totalSalesCount: result.totalSales,
      warehouseProductsCount: result.warehouseProducts,
    };

    return data;
  }

  async createProduct(dto: productDto) {
    const product = this.product.create(dto);
    await this.product.save(product);

    return {
      quantity: dto.quantity + dto.saled,
      profit: dto.price * dto.saled,
      saled: dto.saled,
      warehouseProducts: dto.quantity,
    };
  }

  async getProducts() {
    const products = await this.product.find();
    return products;
  }

  async removeProduct(id: string) {
    await this.product.delete(id);
    return true;
  }
}
