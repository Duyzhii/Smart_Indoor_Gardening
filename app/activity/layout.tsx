import SideNav from "@/components/SideNav";
import { ControlModeProvider } from "../context/ControlModeContext";

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ControlModeProvider>
      <div className = "flex md:h-screen relative flex-col md:flex-row md:overflow-hidden">
        <div className = "w-20 flex-none lg:w-72 md:border-r">
            <SideNav />
        </div>        
        <div className = "flex-grow mt-4 md:mt-0 flex-1 w-full md:overflow-y-auto max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </ControlModeProvider>
  );
}
