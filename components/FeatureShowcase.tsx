
import { Mic, Headphones, TrendingUp } from 'lucide-react';

const FeatureShowcase = () => {
  const features = [
    { 
      icon: <Mic className="w-8 h-8" />, 
      title: "AI-Powered Creation", 
      desc: "Generate high-quality podcasts with our advanced AI tools and voice synthesis technology" 
    },
    { 
      icon: <Headphones className="w-8 h-8" />, 
      title: "Premium Audio Quality", 
      desc: "Crystal-clear audio processing with professional-grade enhancement and streaming" 
    },
    { 
      icon: <TrendingUp className="w-8 h-8" />, 
      title: "Analytics & Growth", 
      desc: "Detailed insights to help grow your audience and optimize your content strategy" 
    }
  ];

  return (
    <section className='modern-card text-center mb-12'>
      <h3 className='text-32 font-bold bg-gradient-to-r from-white via-white-2 to-green-1 bg-clip-text text-transparent mb-8'>
        Why Creators Choose Us
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {features.map((feature, i) => (
          <div key={i} className='glass-effect hover:border-green-1/40 transition-all duration-300 hover:transform hover:scale-105 group hover:shadow-xl hover:shadow-green-1/20'>
            <div className='text-green-1 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300'>
              {feature.icon}
            </div>
            <h4 className='text-20 font-bold bg-gradient-to-r from-green-1 to-green-2 bg-clip-text text-transparent mb-4'>
              {feature.title}
            </h4>
            <p className='text-14 text-white-4 leading-relaxed'>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureShowcase;
