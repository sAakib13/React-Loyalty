import React from "react";
import Header from "../Header/Header";
import { Card } from "flowbite-react";
import loyalty from "../../assets/loyalty.jpg";
import referral from "../../assets/referral.jpg";
import randomizer from "../../assets/randomizer.jpg";

const Menu = () => {
  return (
    <div className="min-h-screen bg-white font-jost">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main>
        {/* Title Section */}
        <div className="flex flex-col items-center justify-center bg-primary py-10">
          <h1 className="text-3xl font-bold text-white lg:text-5xl">
            Explore Our Programs
          </h1>
        </div>

        {/* Card Section */}
        <div className="container mx-auto py-10">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Loyalty Rewards Card */}
            <a href="/welcome">
              <Card className="h-full">
                <img
                  src={loyalty}
                  alt="Loyalty Rewards"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <h5 className="mt-4 text-center text-2xl font-bold tracking-tight text-primary">
                  Loyalty Rewards
                </h5>
              </Card>
            </a>

            {/* Referral Program Card */}
            <a href="/">
              <Card className="h-full">
                <img
                  src={referral}
                  alt="Referral Program"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <h5 className="mt-4 text-center text-2xl font-bold tracking-tight text-primary">
                  Referral Program
                </h5>
              </Card>
            </a>

            {/* Randomizer Program Card */}
            <a href="/">
              <Card className="h-full">
                <img
                  src={randomizer}
                  alt="Randomizer Program"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <h5 className="mt-4 text-center text-2xl font-bold tracking-tight text-primary">
                  Randomizer Program
                </h5>
              </Card>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Menu;
