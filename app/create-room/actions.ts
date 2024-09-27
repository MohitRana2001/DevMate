"use server"

import { revalidatePath } from "next/cache";
import { Room } from "@/db/schema";
import { createRoom } from "@/data-access/rooms";
import { getSession } from "@/lib/auth";


export async function createRoomAction(roomData : Omit<Room, "id" | "userId">) {
    const session = await getSession();

    if(!session) {
        throw new Error("You must be logged in to create a room");
    }

    const room = await createRoom(roomData, session.user.id as string);

    revalidatePath("/browse");

    return room;
}