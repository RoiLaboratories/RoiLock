import NumberCounter from "../../components/NumberCounter";

// Stats Bar Component with Glow Effect
export default function StatsBar() {
  const stats = [
    {
      value: '1.6k',
      label: 'Total Liquidity Locked'
    },
    {
      value: '1.2k',
      label: 'Total Tokens Locked'
    },
    {
      value: '8k',
      label: 'Total Participants'
    },
    {
      value: '$2.8k',
      label: 'Total Values Locked'
    }
  ];
  
  return (
    <div className="relative w-full mb-8 mt-8 flex">
      {/* Glow effect container */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-300 rounded-lg blur-md opacity-50"></div>
      
      {/* Main bar with border */}
      <div className="relative bg-surface w-full border-t py-4 ">
        <div className="w-11/12 mx-auto flex flex-wrap gap-11">
          {stats.map((stat, index) => (
            <div key={index} className="flex-1 w-[50%] text-center px-2">
              <div className="md:text-5xl text-4xl font-bold text-primary"> 
                <NumberCounter value={stat.value} duration={3000} />
              </div>
              <div className="md:text-lg text-md text-text mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

