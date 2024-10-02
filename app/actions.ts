"use server";

import { deleteUser } from "@/data-access/users";
import { getServerSideSession } from "@/lib/auth";

export async function deleteAccountAction() {
  const session = await getServerSideSession();

  if (!session) {
    throw new Error("you must be logged in to delete your account");
  }

  await deleteUser(session.user.id as string);
}