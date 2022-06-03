import Joi from 'joi'

export default {
  createUserSchema: {
    body: Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'am'] } }),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        userGroup: Joi.array().items()
    }),
  },
}

// id           Int         @id @default(autoincrement())
// firstName    String      @db.VarChar(30)
// lastName     String      @db.VarChar(30)
// email        String      @unique @db.VarChar(30)
// password     String      @db.VarChar(50)
// refreshToken String?      @unique
// roleId       Int
// role         Role        @relation(fields: [roleId], references: [id])
// createdAt    DateTime    @default(now())
// updatedAt    DateTime    @updatedAt
// userGroup    UserGroup[]