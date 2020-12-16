import React from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const NoMatch = () => {
  return (
    <Container className="text-center">
      <h2 className="text-white mt-5">PAGE NOT FOUND</h2>
      <Image
        className="d-md-block d-none mx-auto"
        src="/noFound.png"
        alt="Not Found"
        width={658}
        height={494}
      ></Image>
      <div>
        <Link href="/">GO BACK TO HOME</Link>
      </div>
    </Container>
  );
};

export default NoMatch;
