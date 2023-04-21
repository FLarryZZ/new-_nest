import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {DeleteResult, Repository} from "typeorm";
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

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number) : Promise<Category> {
    return this.categoryRepository.findOneBy({id});
  }

   async update(id: number, updateCategoryDto: UpdateCategoryDto) : Promise<Category> {

    try {
      const category=await this.findOne(id)
      for (const key in updateCategoryDto) {
        category[key]=updateCategoryDto[key];

      }
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new NotFoundException('Category not found ')
    }

  }

  async remove(id: number) : Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
