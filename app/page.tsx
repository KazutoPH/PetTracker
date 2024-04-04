import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row w-full mt-10">
        <div className="w-full max_width items-center flex flex-col lg:flex-row padding-container custom_margin lg:gap-48 gap-16">
          <div className="flex flex-col flex-1">
            <p className=" text-7xl font-bold">
              {`We're Here to Care for `}
              <span className=" text-primary">your pets</span>
            </p>

            <p className=" text-lg text-black mt-6 font-medium">
              Pet Tracker helps you make identification for your pet and
              generate QR with pet info to be downloaded and printed to make
              collar for your pet.
            </p>
          </div>

          <div className="flex flex-1 w-full items-center justify-center">
            <div className="relative h-full w-full max-h-[600px] max-w-[600px] aspect-square rounded-full overflow-hidden">
              <Image
                src="/holdingpet.jpg"
                alt="home image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
