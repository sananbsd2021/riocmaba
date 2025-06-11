
export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">   
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The fastest way to build apps with Sanan Dev{" "}
      </p>
      <div className="w-full p-[2px] bg-gradient-to-r 
      from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
