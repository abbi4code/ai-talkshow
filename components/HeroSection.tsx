
import Link from 'next/link';

const HeroSection = () => {


  return (
    <section className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-1/10 via-black-1/80 to-black-3/50 backdrop-blur-xl border border-green-1/20 p-8 md:p-12'>
      <div className='absolute inset-0 bg-gradient-to-r from-green-1/5 to-transparent' />
      <div className='relative z-10'>
        <h1 className='text-48 md:text-64 font-bold bg-gradient-to-r from-white via-white-2 to-green-2/90 bg-clip-text text-transparent mb-6 leading-tight'>
          Welcome to
          <span className='block text-green-1'>Looooop</span>
        </h1>
        <p className='text-20 text-white-4 max-w-2xl leading-relaxed mb-8'>
          Discover millions of podcasts and create your own with AI-powered tools. Stream anywhere, anytime.
        </p>
        <div className='flex gap-4 flex-wrap'>
         <Link href={"/home"}>
         <button className='bg-gradient-to-r from-green-1 to-green-2 hover:from-green-2 hover:to-green-3 text-black-1 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-green-1/30 transition-all duration-300 hover:scale-105'>
            Start Listening
          </button></Link>
          <Link href={"/discover"} className='border border-white-3/30 hover:border-green-1/50 text-white-2 hover:text-white-1 font-semibold py-4 px-8 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-green-1/10'>
          Explore Now
          </Link>
        </div>
      </div>
      
      {/* Floating audio wave decorations */}
      <div className='absolute top-4 right-4 w-20 h-20 bg-green-1/20 rounded-full blur-xl animate-pulse-green' />
      <div className='absolute bottom-4 left-4 w-32 h-32 bg-green-1/10 rounded-full blur-2xl animate-float' />
      
      {/* Audio wave visualization */}
      <div className='absolute bottom-8 right-8 flex items-center gap-1'>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className='w-1 bg-green-1/70 rounded-full animate-pulse'
            style={{
              height: `${Math.random() * 30 + 15}px`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
