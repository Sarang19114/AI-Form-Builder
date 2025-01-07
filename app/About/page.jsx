"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaRegFileExcel, FaShareAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function LearnMore() {
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-8">
          Learn More About Our App
        </h1>

        {/* Introduction Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            What is Our App?
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Our app leverages cutting-edge AI technology to create customizable and
            shareable forms that adapt to your needs. Simply provide a prompt,
            and our AI-powered Gemini integration generates a dynamic form that
            you can personalize with different backgrounds, styles, and themes to your liking.
            Share the form with others, collect responses, analyze the data, and
            even export it to Excel for further analysis!
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-Powered Form Generation */}
            <Card className="shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle>AI-Powered Form Creation</CardTitle>
                <CardDescription>
                  Generate forms with AI based on your prompt.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Use the power of AI to create forms with custom fields,
                  themes, and styles tailored to your needs. Simply provide a
                  prompt, and our AI does the rest.
                </p>
              </CardContent>
            </Card>

            {/* Customizable & Shareable Forms */}
            <Card className="shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle>Customizable & Shareable</CardTitle>
                <CardDescription>
                  Personalize your forms and share them easily.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Customize your form with different backgrounds, fonts, and
                  styles. Share your form instantly with others through a link
                  or social media.
                </p>
                <div className="mt-4 flex justify-center">
                  <FaShareAlt className="text-4xl text-blue-500" />
                </div>
              </CardContent>
            </Card>

            {/* Data Analytics & Export */}
            <Card className="shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle>Data Analytics & Excel Export</CardTitle>
                <CardDescription>
                  Analyze and export your data effortlessly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  View detailed analytics of your form responses. Export the
                  data to an Excel file for easy offline access and analysis.
                </p>
                <div className="mt-4 flex justify-center">
                  <FaRegFileExcel className="text-4xl text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            How It Works
          </h2>
          <div className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            <p className="mb-4">
              Our app is designed to be simple yet powerful. Here’s how it
              works:
            </p>
            <ol className="list-decimal pl-8 space-y-4 text-lg text-left">
              <li>
                <strong>AI-Powered Form Creation:</strong> Input your prompt,
                and our AI will generate a fully functional form.
              </li>
              <li>
                <strong>Customization:</strong> Choose from various themes,
                backgrounds, and form fields to tailor the form.
              </li>
              <li>
                <strong>Sharing:</strong> Share the form with your audience via
                a unique link.
              </li>
              <li>
                <strong>Data Collection:</strong> Collect responses instantly
                and securely.
              </li>
              <li>
                <strong>Analytics:</strong> View detailed analytics of
                responses, including trends and insights.
              </li>
              <li>
                <strong>Export:</strong> Export your data to Excel for easy
                offline management.
              </li>
            </ol>
          </div>
        </section>

        {/* Subscription Models */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            Choose Your Subscription
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Monthly Subscription */}
            <Card className="bg-blue-50 hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle>Monthly Plan</CardTitle>
                <CardDescription>Flexible monthly payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">₹200.00 / month</p>
                <Button
                  className="w-full"
                  onClick={() => handleRedirect("/dashboard/upgrade")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Yearly Subscription */}
            <Card className="bg-green-50 hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle>Yearly Plan</CardTitle>
                <CardDescription>
                  Save more with annual payments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">₹1500.00 / year</p>
                <Button
                  className="w-full"
                  onClick={() => handleRedirect("/dashboard/upgrade")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About the Developer Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            About The Developer
          </h2>
          <div className="flex flex-col items-center lg:flex-row gap-8">
            <div className="w-64 h-40 rounded-3xl overflow-hidden flex items-center justify-center">
              {/* Profile Image */}
              <img
                src="/me.png"
                alt="Developer"
                className="w-50 h-40 rounded-full shadow-lg"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-lg text-gray-700">
                Hi, I'm <strong>Sarang Rastogi</strong>, the developer behind
                this app. I created this platform to simplify form creation,
                data collection, and analysis using the power of AI. My goal is
                to make complex tasks easier and more accessible for everyone.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com/in/sarang-rastogi-498948249/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mt-4">Contact Me</Button>
                </a>

                <p className="mt-4 text-xl">
                  or Mail me @: rastogi.sarang19@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Start creating your custom forms today. It's
            easy, quick, and powerful.
          </p>
          <Button onClick={() => handleRedirect("/dashboard")}>
            Get Started
          </Button>
        </section>
      </div>
    </div>
  );
}
