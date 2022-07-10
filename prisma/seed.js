import { prisma } from '../src/services/Prisma.js'

async function main() {
  const roleData = [{ name: 'Admin' }, { name: 'Teacher' }, { name: 'Student' }]
  const subjectsData = [
    { name: 'Free class' },
    { name: 'Math' },
    { name: 'English' },
    { name: 'History' },
    { name: 'Geography' },
    { name: 'Science' },
    { name: 'Art' },
    { name: 'Philosophy' },
    { name: 'Linear algebra' },
  ]

  await prisma.$transaction(
    roleData.map((role) =>
      prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: { name: role.name },
      })
    )
  )

  const adminRoleId = await prisma.role.findUnique({
    where: { name: 'Admin' },
    select: { id: true },
  })

  await prisma.$transaction(
    subjectsData.map((subject) =>
      prisma.subject.upsert({
        where: { name: subject.name },
        update: {},
        create: { name: subject.name },
      })
    )
  )

  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Admin',
      roleId: adminRoleId.id,
      password: '$2b$10$K5wLReLVJ5Jhq1GzxqXndeYpOBHxfeFI5SUcJee/n9QTLj6sJRnqi', // admin
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
