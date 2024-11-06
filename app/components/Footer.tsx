import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="row-start-2 flex gap-4 flex-wrap items-center justify-center">
      Feito por Wilson
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://www.linkedin.com/in/wilson-alves-franchi-dos-santos-b3ba3332/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/linkedin_icon.png"
          alt="Linkedin"
          width={24}
          height={24}
        />
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/Wilrrama"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/github-icon-2.svg"
          alt="Github"
          width={24}
          height={24}
        />
      </a>
    </footer>
  );
};
