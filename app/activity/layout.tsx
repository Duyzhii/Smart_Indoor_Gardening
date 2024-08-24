import SideNav from "@/components/SideNav";

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className = "flex md:h-screen relative flex-col md:flex-row md:overflow-hidden">
        <div className = "w-20 flex-none lg:w-72 md:border-r">
            <SideNav />
        </div>        
        <div className = "flex-grow mt-8 md:mt - 0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
          {children}
        </div>
    </div>
  );
}
