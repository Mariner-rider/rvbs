import React from 'react';
import Header from './Header';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Rocket, 
  Settings, 
  TrendingUp 
} from 'lucide-react';
import Footer from './Footer';
import { motion as m } from "framer-motion";

// Only left & right animation
const cardVariants = (direction) => ({
  offscreen: { 
    x: direction === 'left' ? -80 : 80, 
    opacity: 0 
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { 
      duration: 0.35, 
      ease: "easeOut" 
    }
  }
});

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Transforming Indian Technology",
      description:
        "Bharattech is revolutionizing India's technology ecosystem with innovative AI, data accessibility, and advanced computing products—emphasizing privacy, efficiency, and sustainability while fostering startups."
    },
    {
      icon: Settings,
      title: "Empowering India with Tailored Solutions",
      description:
        "Offering products like BharatAI, Recag, Collegecue, and Bsearch to tackle high computing costs, boost education, and enable AI-driven hyper-local search with inclusivity and security."
    },
    {
      icon: TrendingUp,
      title: "Innovative Solutions for Growth & Success",
      description:
        "Affordable, scalable solutions including BharatAI, Recag GPU rental, Collegecue, and Bsearch help startups innovate, scale, and thrive in competitive markets."
    },
    {
      icon: Cpu,
      title: "Advanced Training",
      description:
        "Our LLMs are trained on complex datasets like BooksCorpus, ArXiv, and GitHub Repositories to understand intricate queries, provide accurate responses, and adapt to use cases."
    },
    {
      icon: ShieldCheck,
      title: "Privacy-Centric Design",
      description:
        "BharatAI ensures maximum data privacy through closed AI systems that do not track or store user activity."
    },
    {
      icon: Layers,
      title: "Scalability and Modularity",
      description:
        "From NLP to industry-specific tools, our systems adapt and expand alongside businesses and individuals' evolving needs."
    }
  ];

  return (
    <>
      <Header />

      <div
        style={{
          background: `
            radial-gradient(
              circle at center, 
              transparent 0%, 
              transparent 30%, 
              rgba(255, 255, 255, 0.6) 70%,  
              rgba(255, 255, 255, 0.6) 100%
            ),
            linear-gradient(
              to right, 
              #e2eef6 0%,     
              #d3def8 45%,    
              #c8d3f8 65%,   
              #dcd6f7 85%,    
              #f1eef6 100%
            )
          `
        }}
      >
        {/* Features & CTA */}
        <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Section Heading */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Expanding upon our core AI-powered features
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Combining innovation, scalability, and privacy to empower the next generation of AI solutions.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const direction = index % 2 === 0 ? "left" : "right"; // alternate left/right

              return (
                <m.div
                  key={index}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-lg transition-all duration-300"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants(direction)}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Icon */}
                  <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg group-hover:scale-110 transform transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </m.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <m.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 p-10 rounded-3xl shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to experience the future of AI?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Explore our cutting-edge features and start building with BharatAI today.
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-md">
                Get Started Now
              </button>
            </m.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Features;
