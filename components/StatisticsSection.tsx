
const StatisticsSection = () => {
    const stats = [
      { number: "100M+", label: "Monthly Listeners" },
      { number: "4M+", label: "Podcasters" },
      { number: "70M+", label: "Tracks" },
      { number: "180+", label: "Markets" }
    ];
  
    return (
      <section className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-1/15 via-black-1/60 to-green-1/10 backdrop-blur-xl border border-green-1/30 p-12 mb-12'>
        <h3 className='text-28 font-bold text-center mb-12 bg-gradient-to-r from-white to-green-1 bg-clip-text text-transparent'>
          Join Millions of Listeners
        </h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {stats.map((stat, i) => (
            <div key={i} className='group'>
              <div className='text-48 font-bold bg-gradient-to-r from-green-1 to-green-2 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform'>
                {stat.number}
              </div>
              <div className='text-16 text-white-4 font-medium'>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default StatisticsSection;
  