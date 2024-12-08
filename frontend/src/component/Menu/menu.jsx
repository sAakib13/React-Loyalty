import React from "react";
import Header from "../Header/Header";
import { Card } from "flowbite-react";
import loyalty from "../../assets/loyalty.jpg";
import referral from "../../assets/referral.jpg";
import randomizer from "../../assets/randomizer.jpg";

const Menu = () => {
    return (
        <div className="font-jost bg-white min-h-screen">
            {/* Header Section */}
            <Header />

            {/* Main Content Section */}
            <main>
                {/* Title Section */}
                <div className="flex flex-col items-center justify-center bg-primary py-10">
                    <h1 className="text-white text-3xl lg:text-5xl font-bold">
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
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <h5 className="text-2xl font-bold tracking-tight text-center text-primary mt-4">
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
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <h5 className="text-2xl font-bold tracking-tight text-center text-primary mt-4">
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
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <h5 className="text-2xl font-bold tracking-tight text-center text-primary mt-4">
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
