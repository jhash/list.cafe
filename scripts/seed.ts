import { Prisma, PartnershipStatus } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`

    console.log("\nUsing the default './scripts/seed.{js,ts}' template\n")

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (const user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }

    if (process.env.AMAZON_ASSOCIATE_ID) {
      const partnerships: Prisma.PartnershipCreateArgs['data'][] = [
        {
          name: 'Amazon',
          url: 'amazon.com',
          affiliateId: process.env.AMAZON_ASSOCIATE_ID,
          affiliateIdParam: 'tag',
          status: PartnershipStatus['SIGNING'],
          notes: 'From seed - need 3 purchases to access API',
        },
      ]
      // Seed Partnerships
      await db.partnership.createMany({
        data: partnerships,
        skipDuplicates: true,
      })
    }

    // Identifiers for each route that cuts off identifiers catch-all route
    const identifiers: Prisma.IdentifierCreateArgs['data'][] = [
      {
        id: 'reset-password',
      },
      {
        id: 'forgot-password',
      },
      {
        id: 'signup',
      },
      {
        id: 'login',
      },
      {
        id: 'admin',
      },
    ]

    await db.identifier.createMany({ data: identifiers, skipDuplicates: true })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
