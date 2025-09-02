
import React from 'react';
import HeroCarousel from '../components/HeroCarousel';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroCarousel />
      {/* <section className="py-20 md:py-32 bg-brand-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
            Pioneering Architectural Excellence
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
            Our studio is a collective of architects, designers, and thinkers dedicated to creating spaces that are not only beautiful but also deeply functional and sustainable. We believe in a collaborative process, working closely with our clients to bring their vision to life with precision and passion.
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
