import React from "react";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:px-10">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-white to-[#b26ee3] text-transparent bg-clip-text">
            Get in touch
          </h2>

          <p className="text-gray-400 max-w-md text-sm leading-relaxed">
            Have questions about your finances or need help managing your transactions?
            Reach out and we’ll help you stay in control.
          </p>

          <div className="space-y-4 mt-6">
            
            {/* Phone */}
            <div className="flex items-center gap-3 text-gray-300">
              <div className="bg-[#1a1a24] p-2 rounded-md">
                📞
              </div>
              <span className="text-sm">+91 8839170393</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-gray-300">
              <div className="bg-[#1a1a24] p-2 rounded-md">
                ✉️
              </div>
              <span className="text-sm">piyush777agrawal@gmail.com</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-gray-300">
              <div className="bg-[#1a1a24] p-2 rounded-md">
                📍
              </div>
              <span className="text-sm">Ganj Basoda, India</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="bg-gradient-to-b from-[#2A0150] to-[#090025] border border-[#26263a] rounded-xl p-6 space-y-5 shadow-md">
          
          <h3 className="text-lg font-medium text-white">
            Send a message
          </h3>

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-[#1a1a24] text-white border border-[#26263a] rounded-md px-3 py-2 outline-none focus:border-[#7c3aed]"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-[#1a1a24] text-white border border-[#26263a] rounded-md px-3 py-2 outline-none focus:border-[#7c3aed]"
          />

          {/* Message */}
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full bg-[#1a1a24] text-white border border-[#26263a] rounded-md px-3 py-2 outline-none focus:border-[#7c3aed] resize-none"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#7c3aed] to-[#9333ea] hover:opacity-90 text-white py-2 rounded-md transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;