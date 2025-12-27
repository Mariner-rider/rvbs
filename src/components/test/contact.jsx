import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Instagram, Plus, Minus, ChevronRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [mapState, setMapState] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    dragStart: { x: 0, y: 0 }
  });

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
  };

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(mapState.scale * delta, 0.5), 3);
      setMapState(prev => ({ ...prev, scale: newScale }));
    }
  };

  const handleMouseDown = (e) => {
    setMapState(prev => ({
      ...prev,
      isDragging: true,
      dragStart: { x: e.clientX - prev.translateX, y: e.clientY - prev.translateY }
    }));
  };

  const handleMouseMove = (e) => {
    if (mapState.isDragging) {
      setMapState(prev => ({
        ...prev,
        translateX: e.clientX - prev.dragStart.x,
        translateY: e.clientY - prev.dragStart.y
      }));
    }
  };

  const handleMouseUp = () => {
    setMapState(prev => ({ ...prev, isDragging: false }));
  };

  const zoomIn = () => setMapState(prev => ({ ...prev, scale: Math.min(prev.scale * 1.2, 3) }));
  const zoomOut = () => setMapState(prev => ({ ...prev, scale: Math.max(prev.scale * 0.8, 0.5) }));
  const resetMap = () => setMapState({ scale: 1, translateX: 0, translateY: 0, isDragging: false, dragStart: { x: 0, y: 0 } });

  useEffect(() => {
    const move = (e) => handleMouseMove(e);
    const up = () => handleMouseUp();
    if (mapState.isDragging) {
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
  }, [mapState.isDragging]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="relative w-full h-80 overflow-hidden rounded-3xl mb-8 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <h1 className="text-5xl font-light text-white">Contact Us</h1>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16">
            {/* Left Side */}
            <div className="lg:w-1/2 space-y-4 sm:space-y-6 md:space-y-8">
              <div className="text-xs sm:text-sm text-gray-400 tracking-wide">[ get in touch ]</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                We are always ready to help you and answer your questions
              </h2>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                Have questions or want to collaborate? We’d love to hear from you.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="space-y-2">
                  <h4 className="font-semibold text-base sm:text-lg">Contact</h4>
                  <p className="text-gray-800 text-sm sm:text-base">+91-05124050467</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-base sm:text-lg">Our Location</h4>
                  <p className="text-gray-800 text-sm sm:text-base">Lucknow, Uttar Pradesh, India</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-base sm:text-lg">Email</h4>
                <div className="bg-white text-black px-3 sm:px-4 py-1 sm:py-2 rounded-xl inline-block">
                  <span className="font-medium text-sm sm:text-base">Contact@bharatai.bsearch.in</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-gray-900">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Get in Touch</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4 sm:space-y-6">
                  <input type="text" name="fullName" placeholder="Full name" value={formData.fullName} onChange={handleInputChange} className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea name="message" placeholder="Message" rows="4" value={formData.message} onChange={handleInputChange} className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-md sm:rounded-lg font-medium transition-colors duration-300 flex items-center gap-2">
                    Send message
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us on the Map</h2>
              <p className="text-gray-600">Use Ctrl + Mouse Wheel to zoom in/out. Click and drag to move around.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-4 relative">
              {/* Controls */}
              <div className="absolute top-6 right-6 z-10 flex flex-col space-y-2">
                <button onClick={zoomIn} className="bg-white shadow-lg border border-gray-200 rounded-lg p-2"> <Plus className="w-5 h-5 text-gray-600" /> </button>
                <button onClick={zoomOut} className="bg-white shadow-lg border border-gray-200 rounded-lg p-2"> <Minus className="w-5 h-5 text-gray-600" /> </button>
                <button onClick={resetMap} className="bg-white shadow-lg border border-gray-200 rounded-lg p-2 text-xs font-medium text-gray-600">Reset</button>
              </div>

              {/* Map */}
              <div ref={mapContainerRef} className="relative h-96 bg-gray-100 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing" onWheel={handleWheel} onMouseDown={handleMouseDown}>
                <div ref={mapRef} className="absolute inset-0 transition-transform duration-75" style={{ transform: `translate(${mapState.translateX}px, ${mapState.translateY}px) scale(${mapState.scale})`, transformOrigin: 'center center' }}>
                  <div className="w-full h-full relative bg-gradient-to-br from-blue-100 to-green-100">
                    {/* Location markers */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full shadow-lg text-sm">📍 Lucknow</div>
                      <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
