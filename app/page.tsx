import Image from "next/image";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { signIn } from "next-auth/react";
import { GuestLoginButton } from "@/components/guestloginbutton";
import { getServerSideSession } from "@/lib/auth";


export default function LandingPage() {
  const session = await getServerSideSession();
  const words = [
    "awesome",
    "cool",
    "amazing",
    "fantastic",
    "wonderful",
    "incredible",
    "excellent",
    "fabulous",
    "superb",
    "marvelous",
    "exceptional",
    "splendid",
    "brilliant",
    "stunning",
    "impressive",
    "astounding",
  ];

  return (
    // <BackgroundBeamsWithCollision>
    <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto relative isolate">
        <BackgroundGradient />
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            <div className="flex flex-col space-y-4 items-center">
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <span className="sm:inline">Find other</span>
                <span className="w-full sm:w-auto px-2">
                  <Highlight>
                    <FlipWords className="inline-block" words={words} />
                  </Highlight>
                </span>
              </div>
              <div>devs to pair with online</div>
            </div>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            This platform is for sharing your screen and working with other
            random developers online so that you can work together
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Link href="/browse">
              <HoverBorderGradient>Get started</HoverBorderGradient>
            </Link>
            {!session && <GuestLoginButton />}
          </div>
        </div>
        <BackgroundGradient bottom />
      </div>
    </div>
    // </BackgroundBeamsWithCollision>
  );
}

function BackgroundGradient({ bottom = false }) {
  return (
    <div
      className={`absolute inset-x-0 ${
        bottom ? "bottom-0" : "-top-40"
      } -z-10 transform-gpu overflow-hidden blur-3xl sm:${
        bottom ? "-bottom-80" : "-top-80"
      }`}
      aria-hidden="true"
    >
      <div
        className={`relative ${
          bottom ? "left-[calc(50%+3rem)]" : "left-[calc(50%-11rem)]"
        } aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:${
          bottom ? "left-[calc(50%+36rem)]" : "left-[calc(50%-30rem)]"
        } sm:w-[72.1875rem]`}
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      />
    </div>
  );
}
