import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@gmail.com',
      password: '12345678',
      username: 'user1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@gmail.com',
      password: '12345678',
      username: 'user2',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'user3@gmail.com',
      password: '12345678',
      username: 'user3',
    },
  });

  // Seed categories
  const category1 = await prisma.category.create({
    data: { name: 'Development' },
  });

  const category2 = await prisma.category.create({
    data: { name: 'Design' },
  });

  const category3 = await prisma.category.create({
    data: { name: 'Marketing' },
  });

  // Seed task
  await prisma.task.createMany({
    data: [
      {
        title: 'complete API Documentation',
        description: 'Finsih documenting the API endpoints for the projects',
        status: 'OPEN',
        dueDate: new Date('2024-10-15T00:00:00Z'),
        userId: user1.id,
        categoryId: category1.id,
      },
      {
        title: 'Create UI Mockups',
        description:
          'Design the user interface mockups for the new application.',
        status: 'IN_PROGRESS',
        dueDate: new Date('2024-10-20T00:00:00Z'),
        userId: user2.id,
        categoryId: category2.id,
      },
      {
        title: 'Social Media Campaign',
        description:
          'Plan and execute the social media campaign for the product launch.',
        status: 'COMPLETED',
        dueDate: new Date('2024-10-10T00:00:00Z'),
        userId: user3.id,
        categoryId: category3.id,
      },
    ],
  });

  // Seed comments
  await prisma.comment.createMany({
    data: [
      {
        content: 'This is a high priority task.',
        taskId: 1,
        userId: user2.id,
      },
      {
        content: 'Can we discuss the design elements?',
        taskId: 2,
        userId: user1.id,
      },
      {
        content: 'Great job on the campaign!',
        taskId: 3,
        userId: user1.id,
      },
    ],
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
