import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 border-t">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p>© 2024 CryptoScope. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className=" hover:text-gray">
              Privacy Policy
            </a>
            <a href="#" className=" hover:text-gray">
              Terms of Service
            </a>
            <a href="#" className=" hover:text-gray">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
