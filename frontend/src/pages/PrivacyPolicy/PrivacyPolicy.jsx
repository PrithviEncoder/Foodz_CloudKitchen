import React from 'react'

const PrivacyPolicy = () => {
  return (
      <div>
          
          <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-r from-[#FCE8D5] via-[#FAD2E1] to-[#FCE8D5]">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-12 border border-gray-300">
        <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-8">Privacy Policy</h2>
        <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">
          Last Updated : <span className="font-semibold">27/03/2025</span>
        </p>
        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">1. Introduction</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to <span className="font-bold text-rose-500">FOODZ</span>. Your privacy matters to us. This policy outlines how we collect, use, and safeguard your data.
          </p>
        </div>
        <div className="border-t border-gray-300 pt-6 mt-4">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">2. Information We Collect</h3>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-2">
            <li><span className="font-semibold">Personal Information:</span> Name, email, phone, address, payment details.</li>
            <li><span className="font-semibold">Order Information:</span> Details of food orders and transaction history.</li>
            <li><span className="font-semibold">Technical Information:</span> IP address, device type, and browser details.</li>
          </ul>
        </div>
        <div className="border-t border-gray-300 pt-6 mt-4">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            We use your information to enhance your experience, process orders efficiently, and ensure secure transactions.
          </p>
        </div>
        <div className="border-t border-gray-300 pt-6 mt-4">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">4. Order Cancellation Policy</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Once an order is placed, it can be canceled within <span className="font-semibold">5 minutes</span> before food preparation begins. 
            After this period, cancellations are not possible. You can use our chatbot to get contact details which  you can use to contact us for an order cancellation or dial +91 7014274154.
          </p>
        </div>
        <div className="border-t border-gray-300 pt-6 mt-4">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">5. Contact Us</h3>
          <p className="text-gray-700 text-lg">
            For privacy concerns, reach out to us at <span className="font-bold text-rose-500">support@foodz.com</span>
          </p>
        </div>
      </div>
    </div>

    </div>
  )
}

export default PrivacyPolicy