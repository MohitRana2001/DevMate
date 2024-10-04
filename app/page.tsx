import Image from "next/image";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { FlipWords } from "@/components/ui/flip-words";

export default function LandingPage() {
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
    <div className="">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-12">
          <div className="text-center">
            <Image
              className="inline-block"
              src="/icon.png"
              width="200"
              height="200"
              alt="dev finder logo"
            />

            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                <div className="flex flex-col space-y-4 items-center">
                  {/* First line: "Find other" and dynamic word */}
                  <div className="flex gap-2 items-center">
                    {/* Static part */}
                    <div>Find other</div>

                    {/* Dynamic part with auto-sizing container */}
                    <div className="px-2 inline-block">
                      <Highlight>
                        <FlipWords className="inline-block" words={words} />
                      </Highlight>
                    </div>
                  </div>

                  {/* Second line: "devs to pair with online" */}
                  <div>devs to pair with online</div>
                </div>
              </h1>
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              This platform is for sharing your screen and working with other
              random developers online so that you can work together
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/browse">
                <HoverBorderGradient>Get started</HoverBorderGradient>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
