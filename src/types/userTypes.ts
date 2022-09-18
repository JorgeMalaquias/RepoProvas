import { Users } from "@prisma/client";


export type TypeUser = Omit<Users, "id">;