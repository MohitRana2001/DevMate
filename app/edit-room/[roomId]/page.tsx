import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";

export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  unstable_noStore();
  const room = await getRoom(params.roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
  <div className="min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
    <h1 className="text-4xl font-bold mb-6 text-center">Edit Room</h1>
    <EditRoomForm room={room} />
  </div>
  </div>
  );
}