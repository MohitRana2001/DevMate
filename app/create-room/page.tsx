import { CreateRoomForm } from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-black dark:text-white">
          Create Room
        </h1>
        <CreateRoomForm />
      </div>
    </div>
  );
}
