import React from "react";
import { Container, Button } from ".";

const Hero = () => {
  return (
    <div className=" bg-white border-b">
      <Container className="flex h-full flex-col py-10 max-[840px]:py-0">
        <h1 className="text-9xl max-[750px]:text-8xl font-semibold my-10 max-[840px]:leading-tight max-[840px]:my-5 max-[635px]:leading-snug max-[422px]:text-[80px]">
          Stay curious
        </h1>
        <p className="text-4xl text-zinc-700 max-[750px]:text-2xl max-[635px]:text-xl max-[422px]:text-lg">
          Discover stories, thinking, and expertise
          <br /> from writers on any topic.
        </p>
        <div className="my-7">
          <Button className="border text-xl bg-white px-6 py-2 rounded-full active:scale-95 transition-all max-[635px]:text-base max-[422px]:text-sm">
            start Reading
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
