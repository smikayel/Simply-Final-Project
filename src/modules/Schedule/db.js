import { prisma } from '../../services/Prisma.js'

const { schedule } = prisma

export const getScheduleById = async (id) => {
  return schedule.findUnique({
    include: {
      scheduleSubject: true,
    },
    where: {
      id,
    },
  })
}

export const getScheduleByGroupId = async (groupId, day) => {
  try {
    const schedules = await schedule.findMany({
      include: {
        scheduleSubject: {
          include: {
            subject: true,
          },
        },
      },
      where: {
        groupId,
        day,
      },
    })
    return schedules
  } catch (err) {
    throw err.message
  }
}

export const createSchedule = async ({ scheduleSubject, ...data }) => {
  try {
    const schedules = await schedule.create({
      data: {
        ...data,
        scheduleSubject: {
          createMany: {
            data: scheduleSubject,
          },
        },
      },
    })
    return schedules
  } catch (err) {
    throw err.message
  }
}

export const deleteSchedule = async (id) => {
  try {
    const schedules = await schedule.delete({
      where: {
        id,
      },
    })
    return schedules
  } catch (err) {
    throw err.message
  }
}

export const updateSchedule = async ({ id, day, groupId, scheduleSubject }) => {
  try {
    return prisma.$transaction(async (prisma) => {
      const schedules = await prisma.schedule.update({
        data: {
          day,
          groupId,
        },
        where: {
          id,
        },
      })
      for (const { time, oldTime, subjectId, id: schSubId } of scheduleSubject) {
        await prisma.scheduleSubject.update({
          data: {
            time: new Date(time).toISOString(),
            subjectId,
          },
          where: {
            id: schSubId,
            // scheduleId_time: {
            //   scheduleId: id,
            //   time: new Date(oldTime).toISOString(),
            // },
          },
        })
      }
      return schedules
    })
  } catch (err) {
    throw err.message
  }
}
