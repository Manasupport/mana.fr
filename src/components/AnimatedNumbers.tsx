import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedNumber = ({ value, suffix = "", prefix = "", duration = 2000 }: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = 0;
    const endValue = value;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutCubic);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

interface StatsProps {
  stats: {
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
  }[];
}

const AnimatedStats = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`text-center fade-in-up stagger-${index + 1}`}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-bold text-white mb-3">
              <AnimatedNumber 
                value={stat.value} 
                suffix={stat.suffix} 
                prefix={stat.prefix}
              />
            </div>
            <div className="text-white/90 text-sm font-medium">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedStats;