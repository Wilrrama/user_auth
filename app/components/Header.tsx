import Image from "next/image";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center gap-7">
      <Image
        src="/equipeDigital.png"
        alt="Equipe Digital"
        width={200}
        height={200}
        className="py-2"
      />
      <ol className="flex flex-col py-5 gap-4 --font-geist-sans">
        <li>Sistemas</li>
        <li>Web Sites</li>
        <li>Marketing Digital</li>
      </ol>
    </header>
  );
};
