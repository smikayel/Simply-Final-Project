const includes = {
    userTest: {
        select: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                }
            }
        }
    } ,
    subject: true,
    questions: {
        include: {
            answers: true,
        }
    }
}

export  default includes;