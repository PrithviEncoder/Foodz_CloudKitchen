import React from 'react'

const AboutUs = () => {
  return (
      <div>
          
          <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-r from-[#FCE8D5] via-[#FAD2E1] to-[#FCE8D5]">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-xl p-10 border border-gray-300">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">About Us</h2>
        <p className="text-lg text-gray-800 text-center mb-6 leading-relaxed">
          Welcome to <span className="font-bold text-rose-500">FOODZ</span>, where we bring you high-quality, restaurant-style meals crafted
          with passion. Our cloud kitchen is committed to delivering fresh, delicious food straight to your doorstep.
        </p>
        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h3>
          <p className="text-gray-800 text-lg leading-relaxed">
            We aim to offer a seamless food ordering experience while maintaining top-notch quality, taste, and hygiene standards.
          </p>
        </div>
        <div className="border-t border-gray-300 pt-6 mt-4">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Why Choose Us?</h3>
          <ul className="list-disc list-inside text-gray-800 text-lg leading-relaxed space-y-2">
            <li className="text-rose-500 font-semibold">Fresh, high-quality ingredients in every dish</li>
            <li className="text-rose-500 font-semibold">Fast and reliable doorstep delivery</li>
            <li className="text-rose-500 font-semibold">Strict hygiene and safety measures</li>
            <li className="text-rose-500 font-semibold">Diverse menu catering to all taste preferences</li>
          </ul>
        </div>
        <div className="border-t border-gray-300 pt-6 mt-4 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h3>
          <p className="text-gray-800 text-lg">For inquiries, reach us at <span className="font-bold text-rose-500">support@foodz.com</span></p>
        </div>
      </div>
    </div>

    </div>
  )
}

export default AboutUs