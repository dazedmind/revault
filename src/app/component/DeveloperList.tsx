import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const DeveloperList = ({ onClick }: { onClick: () => void }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const developers = [
    {
      name: "Durante, KC D.",
      role: "Programmer & Documentation",
      icon: "💻",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Lastra, Kristhia Cayle F.",
      role: "Team Leader & Documentation Head",
      icon: "👑",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Insigne, Matthew Jacob B.",
      role: "System Programmer",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Valena, John Allen Troy E.",
      role: "Lead Programmer & System Designer",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Yacub, Jetthro Karl C.",
      role: "Documentation Member",
      icon: "📝",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className={`rounded-2xl bg-dusk dark:bg-accent border ${theme === 'light' ? 'border-white-50' : 'border-white-5'} w-lg relative z-10 max-h-[90vh] overflow-y-auto shadow-2xl
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-card-foreground
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-tertiary
        [&::-webkit-scrollbar-thumb:hover]:bg-gold/50
        [&::-webkit-scrollbar]:hidden`}>
        
        {/* Header Section */}
        <div className="text-center p-6 pb-4">
     
          <h1 className="text-3xl font-bold font-mono text-yale-blue mb-2">
            System Developers
          </h1>
          <p className={`text-md italic ${theme === 'light' ? 'text-white-5' : 'text-white-50'}`}>
          &quot;Keyboard Warriors&quot; 🛡️⚔️
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Developers Grid */}
        <div className="px-6 pb-6">
          <div className="grid gap-4 md:grid-cols-1">
            {developers.map((dev, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  theme === 'light' ? 'bg-tertiary/50 hover:bg-tertiary/70' : 'bg-dusk hover:bg-accent/50'
                }`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${dev.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${dev.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {dev.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gold mb-1 group-hover:text-gold-fg transition-colors">
                        {dev.name}
                      </h3>
                      <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-white-5' : 'text-white-75'}`}>
                        {dev.role}
                      </p>
                    </div>
                  </div>
                </div>

               
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className={`px-6 py-4 border-t ${theme === 'light' ? 'border-white-25' : 'border-white-10'} bg-gradient-to-r from-transparent via-gold/5 to-transparent`}>
          <div className="text-center mb-4">
            <p className={`text-xs ${theme === 'light' ? 'text-white-25' : 'text-white-50'}`}>
              Built with ❤️ for PLM Library
            </p>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={onClick} 
              className="group relative cursor-pointer overflow-hidden bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Close</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">✕</span>
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperList;