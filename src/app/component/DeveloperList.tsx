import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const DeveloperList = ({ onClick }: { onClick: () => void }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
    <div className={`p-5 rounded-lg bg-dusk dark:bg-accent border-1 ${theme === 'light' ? ' border-white-50' : 'border-white-5'} w-90 md:w-full max-w-md relative z-10 max-h-[80vh] overflow-y-auto`}>
    
        <span className="flex flex-col mb-3">
            <h1 className="text-3xl font-bold font-mono text-yale-blue text-center">
                System Developers
            </h1>
            <p className={`text-md  ${theme === 'light' ? 'text-white-5' : 'text-white-50'} text-center`}>(Keyboard Warriors)</p>
        </span>
      <div className="flex flex-col gap-2">
        <div className="p-3 rounded-lg bg-white/5">
          <h3 className="text-lg font-medium text-gold">Durante, KC D.</h3>
          <p className="text-sm ">Programmer and Documentation Member</p>
        </div>
        
        <div className="p-3 rounded-lg bg-white/5">
          <h3 className="text-lg font-medium text-gold">Lastra, Kristhia Cayle F.</h3>
          <p className="text-sm ">Team Leader and Documentation Head</p>
        </div>
        
        <div className="p-3 rounded-lg bg-white/5">
          <h3 className="text-lg font-medium text-gold">Insigne, Matthew Jacob B.</h3>
          <p className="text-sm ">Co-Developer</p>
        </div>
        
        <div className="p-3 rounded-lg bg-white/5">
          <h3 className="text-lg font-medium text-gold">Valena, John Allen Troy E.</h3>
          <p className="text-sm ">Lead Developer and System Designer</p>
        </div>
        
        <div className="p-3 rounded-lg bg-white/5">
          <h3 className="text-lg font-medium text-gold">Yacub, Jetthro Karl C.</h3>
          <p className="text-sm ">Documentation Member</p>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <button 
          onClick={onClick} 
          className="text-white cursor-pointer hover:brightness-110 hover:dark:text-white-75 transition-all duration-300 bg-gold p-2 px-4 rounded-md font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeveloperList