export const getAvgMarks = async (prisma, userId) =>
  prisma.userTest.groupBy({
    by: ['userId'],
    _avg: {
      mark: true,
    },
    where: {
      mark: {
        gte: 0,
      },
      userId,
    },
    orderBy: {
      _avg: {
        mark: 'desc',
      },
    },
  })
