import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { productDto } from './dto/product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_ANALYTIC') private readonly productClient: ClientProxy,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async insertProducts(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Please upload file');
    }
    const result = await this.productService.insertProducts(file);
    this.productClient.emit('insert_products', result);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createProduct(@Body() dto: productDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
