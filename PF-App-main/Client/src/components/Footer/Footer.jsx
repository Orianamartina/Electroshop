import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Copyright © {new Date().getFullYear()} ElectroShop. All rights
          reserved.
        </p>
        <ul className="footer-social">
          <li>
            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Link>
          </li>
          <li>
            <Link
              to="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </Link>
          </li>
          <li>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
          </li>
          <li>
            <Link
              to="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
