import SideNav from "@/components/SideNav";

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className = "flex h-screen relative flex-col md:flex-row md:overflow-hidden">
        <div className = "w-20 lg:w-72 md:border-r">
            <SideNav />
        </div>
        <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-10 max-w-2xl sm:w-[90%] mx-auto">
          {children}
        </div>
    </div>
  );
}
