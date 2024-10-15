import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { title, userId, categoryId, description, dueDate, status } =
      createTaskDto;

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        dueDate,
        userId,
        categoryId,
      },
    });

    return {
      message: 'Task created successfully',
      task,
    };
  }

  async findAll() {
    return await this.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        dueDate: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        dueDate: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskExists = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        ...updateTaskDto,
      },
    });

    return {
      message: 'Task updated successfully',
      task: updatedTask,
    };
  }

  async remove(id: number) {
    try {
      const deletedTask = await this.prisma.task.delete({ where: { id } });
      return {
        message: 'Task deleted successfully',
        task: deletedTask,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      throw error;
    }
  }
}
