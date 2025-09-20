import { AiFillHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-accentPrimary">
      <section className="md:grid md:grid-cols-4 text-white px-12 py-6 md:justify-items-center">
        <div className="justify-items-start">
          <p className="text-secondary font-bold text-xl">Accredel</p>

          <p className="my-5 text-start">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            repudiandae veniam voluptates? Vero excepturi minima est voluptates
            amet nesciunt commodi odio id quam, nobis aliquid iusto nihil dicta
            perspiciatis recusandae.
          </p>
        </div>

        <div className="justify-items-start">
          <p className="text-secondary font-bold text-xl">Quick Links</p>

          <ul className="justify-items-start my-5">
            <li className="mt-3">Home</li>
            <li className="mt-3">Colleges</li>
            <li className="mt-3">Mock Tests</li>
            <li className="mt-3">Jobs</li>
          </ul>
        </div>

        <div className="justify-items-start">
          <p className="text-secondary font-bold text-xl">Useful Links</p>

          <ul className="justify-items-start my-5">
            <li className="mt-3">Your Account</li>
            <li className="mt-3">Become an Affiliate</li>
            <li className="mt-3">Careers</li>
            <li className="mt-3">Help</li>
          </ul>
        </div>

        <div className="justify-items-start">
          <p className="text-secondary font-bold text-xl">Contact</p>

          <ul className="justify-items-start my-5">
            <li className="mt-3 flex items-center gap-1.5">
              <AiFillHome />
              Pune, Maharashtra-412101
            </li>
            <li className="mt-3 flex items-center gap-1.5">
              <MdEmail />
              accredel@gmail.com
            </li>
            <li className="mt-3 flex items-center gap-1.5">
              <MdCall />
              +91 755939XXXX
            </li>
            <li className="mt-3 flex items-center gap-1.5">
              <MdPrint />
              +91 755939XXXX
            </li>
          </ul>
        </div>
      </section>

      <hr className="border-gray-600 border-0.5" />

      <section className="px-12 py-6 text-white md:flex md:justify-between items-center">
        <div className="text-start inline-block my-4">
          © 2025 Copyright:
          <a href="www.accnlawledge.com" className="px-2">accredel.com</a>
        </div>

        <div className=" inline-block my-4">
          <ul className="flex gap-4">
            <FaFacebookSquare className="text-4xl" />
            <FaSquareXTwitter className="text-4xl"/>
            <FaSquareInstagram className="text-4xl"/>
          </ul>
          
        </div>
      </section>
    </footer>
  );
}

export default Footer;
