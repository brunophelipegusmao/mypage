type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <>
      <div className="flex min-h-screen min-w-screen justify-center">
        <div className={`${className} min-w-[1090px] `}>{children}</div>
      </div>
    </>
  );
}
