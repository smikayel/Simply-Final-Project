import { prisma } from '../../services/Prisma.js'

const { schedule } = prisma

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
