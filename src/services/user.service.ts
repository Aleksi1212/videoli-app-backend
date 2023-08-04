import { PrismaClient } from '@prisma/client';
import generateId from '../utils/hash.utils';

const prisma = new PrismaClient();

interface UserData {
    email: string;
    name: string;
    profilePicture: string;
}

type UserRole = 'USER' | 'ADMIN';

interface UserReturnData extends UserData {
    role: UserRole;
}

async function findOrCreateUser(userData: UserData): Promise<UserReturnData> {
    const userId = generateId(userData.email, 20);

    const user = await prisma.user.findUnique({
        where: {
            userId,
        },
    });
    if (user) {
        await prisma.$disconnect();
        return user;
    }

    const createUser = await prisma.user.create({
        data: {
            userId,
            ...userData,
        },
    });

    await prisma.$disconnect();
    return createUser;
}

export { findOrCreateUser };
