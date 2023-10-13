import React from "react";
import { Container, Button } from ".";

const Hero = () => {
  return (
    <div className=" bg-white border-b">
      <Container className="flex h-full flex-col py-10 ">
        <h1 className="text-9xl font-semibold my-10">Stay curious</h1>
        <p className="text-4xl text-zinc-700">
          Discover stories, thinking, and expertise
          <br /> from writers on any topic.
        </p>
        <div className="my-7">
          <Button className="border text-xl bg-white px-6 py-2 rounded-full active:scale-95 transition-all">
            start Reading
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
