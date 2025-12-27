import React from 'react';


import ProductImage1 from '../../assets/images/heroimg2.png';
import ProductImage2 from '../../assets/images/heroimg2.png';
import ProductImage3 from '../../assets/images/heroimg2.png';


const HeaderSection = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl sm:text-5xl font-bold">{title}</h1>
      <p className="mt-4 text-sm sm:text-lg">{subtitle}</p>
    </div>
  );
};


const ContentSection = ({ imageUrl, altText }) => {
  return (
    <div className="rounded-lg shadow-lg p-6 sm:p-10">
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt={altText}
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

const ProductPage = () => {
 
  const sections = [
    {
      title: 'Explore Our Products',
      subtitle: 'Discover cutting-edge AI solutions that elevate your experience and productivity.',
      imageUrl: ProductImage1,
      altText: 'Product Display 1'
    },
    {
      title: 'Why Choose Us?',
      subtitle: 'We provide innovative AI solutions tailored to your needs.',
      imageUrl: ProductImage2,
      altText: 'Product Display 2'
    },
    {
      title: 'Our AI Features',
      subtitle: 'Take advantage of AI to enhance your productivity.',
      imageUrl: ProductImage3,
      altText: 'Product Display 3'
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        
        {sections.map((section, index) => (
          <div key={index}>
            <HeaderSection
              title={section.title}
              subtitle={section.subtitle}
            />
            <ContentSection
              imageUrl={section.imageUrl}
              altText={section.altText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
