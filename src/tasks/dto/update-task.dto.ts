import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: TaskStatus, required: false, default: TaskStatus.OPEN })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus = TaskStatus.OPEN;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  categoryId?: number;
}
