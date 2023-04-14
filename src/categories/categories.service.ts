import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {Category} from "../entities/category.entity";

@Injectable()
export class CategoriesService {
  constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) :Promise<Category> {
    const  categorija= this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(categorija);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
