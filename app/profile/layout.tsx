import SideNav from "@/components/SideNav";
import { ControlModeProvider } from "../context/ControlModeContext";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ControlModeProvider>
      <div className = "flex h-screen relative flex-col md:flex-row md:overflow-hidden">
        <div className = "w-20 lg:w-72 md:border-r">
            <SideNav />
        </div>
        <div className="flex-grow mt-8 md:mt - 0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </ControlModeProvider>
  );
}
