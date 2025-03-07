import React from "react";
import { global } from "../data/site";

const Footer = ({ footerColor }: { footerColor?: string }) => {
  return (
    <footer className={`${footerColor || "bg-blue-400"} text-white py-4`}>
      <div className="max-w-7xl mx-auto  text-center">
        <div>
          <a href={global.socialMedia.facebook} target="_blank" rel="noopener">
            <img
              src="/assets/icons8-facebook-128.svg"
              alt="Facebook"
              className="inline-block h-8 w-8"
            />
          </a>
          <a href={global.socialMedia.instagram} target="_blank" rel="noopener">
            <img
              src="/assets/icons8-instagram-128.svg"
              alt="Instagram"
              className="inline-block h-8 w-8"
            />
          </a>
        </div>
        <div>
          <p>
            &#169; {new Date().getFullYear()} {global.name}. All rights
            reserved.
          </p>
          <p>{global.contact.address}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
