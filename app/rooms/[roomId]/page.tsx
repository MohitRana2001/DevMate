import { TagsList } from "@/components/tags-list";
import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { DevFinderVideo } from "./video-player";
import { splitTags } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

export default async function RoomPage(props: { params: { roomId: string } }) {
  unstable_noStore();
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room of this ID found</div>;
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-4 min-h-screen">
      <div className="w-full md:col-span-3 p-4 md:pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <DevFinderVideo room={room} />
        </div>
      </div>

      <div className="w-full md:col-span-1 p-4 md:pl-2 order-3 md:order-none">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              Github Project
            </Link>
          )}

          <p className="text-base text-gray-600">{room?.description}</p>

          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>

      <div className="w-full md:col-span-3 p-4 order-2 md:order-none">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          {/* Participants list component goes here */}
          <h2 className="text-lg font-semibold mb-2">Participants</h2>
          {/* Add your participants list component or logic here */}
        </div>
      </div>
    </div>
  );
}