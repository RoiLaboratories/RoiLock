import Table from "../../components/Table";
// Example implementation with SupportedChains
export default function SupportedChains() {
  // Chain data
  const chainData = [
    { 
      chain: "Base", 
      logo: <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"><img src="/base.png" alt="" /></div>,
      projects: "2.3k", 
      participants: "9k", 
      liquidityLocked: "294k", 
      valuesLocked: "1.3M" 
    },
    { 
      chain: "BSC", 
      logo: <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"><img src="/bsc.png" alt="" /></div>,
      projects: "2.3k", 
      participants: "9k", 
      liquidityLocked: "294k", 
      valuesLocked: "1.3M" 
    },
    { 
      chain: "Ethereum", 
      logo: <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"><img src="/eth.png" alt="" /></div>,
      projects: "2.3k", 
      participants: "9k", 
      liquidityLocked: "294k", 
      valuesLocked: "1.3M" 
    },
    { 
      chain: "Polygon", 
      logo: <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"><img src="/polygon.png" alt="" /></div>,
      projects: "2.3k", 
      participants: "9k", 
      liquidityLocked: "294k", 
      valuesLocked: "1.3M" 
    },
    { 
      chain: "Arbitrum", 
      logo: <div className="w-6 h-6 rounded-full bg-none flex items-center justify-center"><img src="/arbitrum.png" alt="" /></div>,
      projects: "2.3k", 
      participants: "9k", 
      liquidityLocked: "294k", 
      valuesLocked: "1.3M" 
    }
  ];

  // Column definitions
  const columns = [
    {
      header: "Chain",
      accessor: "chain",
      widthPercent: "30%",
      render: (row) => (
        <div className="flex items-center">
          <div className="mr-2">{row.logo}</div>
          <span className="font-medium">{row.chain}</span>
        </div>
      )
    },
    {
      header: "Projects",
      accessor: "projects",
      widthPercent: "17.5%",
      className: "text-center"
    },
    {
      header: "Participants",
      accessor: "participants",
      widthPercent: "17.5%",
      className: "text-center"
    },
    {
      header: "Liquidity Locked",
      accessor: "liquidityLocked",
      widthPercent: "17.5%",
      className: "text-center"
    },
    {
      header: "Values Locked",
      accessor: "valuesLocked",
      widthPercent: "17.5%",
      className: "text-center"
    }
  ];

  return (
    <div className="w-full flex justify-center items-center mt-8">
      <Table 
        title="Supported Chains" 
        columns={columns} 
        data={chainData}
        containerClassName="md:w-[70%] w-[100%]"
      />
    </div>
  );
}