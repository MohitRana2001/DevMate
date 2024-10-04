import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import { RoomCard } from "./room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { Search, Code, Users, Zap } from "lucide-react";

export default async function Component({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
              Discover Dev Rooms
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect, collaborate, and code with developers from around the world.
            </p>
          </header>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <form className="w-full max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search rooms..."
                  className="pl-10 pr-4 py-2 w-full"
                  name="search"
                />
              </div>
            </form>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/create-room">
                <Code className="mr-2 h-5 w-5" />
                Create Room
              </Link>
            </Button>
          </div>

          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 bg-card rounded-lg shadow-lg p-8 mt-12 text-center">
              <div className="relative w-48 h-48">
                <Image
                  src="/no-data.svg"
                  layout="fill"
                  objectFit="contain"
                  alt="No rooms available"
                  className="opacity-80"
                />
              </div>
              <h2 className="text-2xl font-bold text-primary">No Rooms Found</h2>
              <p className="text-muted-foreground max-w-md">
                Looks like there aren't any rooms matching your criteria. Why not create one?
              </p>
              <Button asChild size="lg">
                <Link href="/create-room">
                  <Code className="mr-2 h-5 w-5" />
                  Create Your First Room
                </Link>
              </Button>
            </div>
          )}

          <section className="mt-16 bg-card rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Why Join Dev Rooms?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Connect"
                description="Meet developers with similar interests and expand your network."
              />
              <FeatureCard
                icon={<Code className="h-8 w-8 text-primary" />}
                title="Collaborate"
                description="Work on exciting projects and learn from peers in real-time."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Grow"
                description="Enhance your skills and stay updated with the latest in tech."
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-lg shadow transition-all duration-300 hover:shadow-md hover:scale-105">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}