import { title } from "process";
import { useToast } from "@/hooks/use-toast";

const CategoryNavigation = () => {
    const categories = [
      { name: "Technology", icon: "💻", gradient: "from-blue-500 to-cyan-500" },
      { name: "Business", icon: "💼", gradient: "from-green-500 to-emerald-500" },
      { name: "Comedy", icon: "😂", gradient: "from-yellow-500 to-orange-500" },
      { name: "Health", icon: "🏥", gradient: "from-red-500 to-pink-500" },
      { name: "Education", icon: "📚", gradient: "from-purple-500 to-indigo-500" },
      { name: "News", icon: "📰", gradient: "from-gray-500 to-slate-500" }
    ];
    const {toast} = useToast()
  
    return (
      <section className='mb-12'>
        <h2 className='text-28 font-bold gradient-text mb-8'>Browse by Category (Coming Soon...)</h2>
        <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
          {categories.map((category, i) => (
            <div 
              key={i} 
              onClick= {() => toast({title: "Coming soon..."})}
              className={`group flex-shrink-0 cursor-pointer p-6 rounded-2xl bg-gradient-to-br ${category.gradient}/15 border border-white-1/10 hover:border-green-1/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-1/20 min-w-[140px] backdrop-blur-sm`}
            >
              <div className='text-center'>
                <div className='text-3xl mb-3 group-hover:scale-125 transition-transform duration-300'>{category.icon}</div>
                <h4 className='text-14 font-semibold text-white-1 group-hover:text-green-1 transition-colors'>
                  {category.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default CategoryNavigation;
  