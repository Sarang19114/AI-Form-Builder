import React from "react";

const Hero = () => {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
        <div className="mx-auto max-w-2xl text-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Create your form
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              not in hours but seconds.{" "}
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed text-gray-600">
            Build smart and responsive forms effortlessly with our AI-powered
            tool. Automate form generation, optimize user inputs, and streamline
            data collection in just a few clicks!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-700 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto"
              href="/dashboard"
            >
              Create AI Form
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm bg-black font-medium text-purple-600 shadow hover:text-purple-700 focus:outline-none focus:ring active:text-purple-500 sm:w-auto"
              href="/About"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
