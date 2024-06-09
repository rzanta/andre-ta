import React, {useState} from "react";
import Tab from "./Tab";

interface ITabsProps {
  className?: string;
  tabs: { title: string; content: React.ReactNode }[]
}

export default function Tabs({tabs, className}: ITabsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  return (
    <div className={`${className}`}>
      <div className="flex flex-row">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab.title}
            active={index === activeTab}
            onCLick={() => setActiveTab(index)}
          />
        ))}
      </div>
      <div className="border-2 border-white-200 mr-6"></div>
      <div className="h-full">
        <div className="mr-6 mt-4">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
}
