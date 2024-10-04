import { CreateRoomForm } from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Create Room</h1>
        <CreateRoomForm />
      </div>
    </div>
  );
}