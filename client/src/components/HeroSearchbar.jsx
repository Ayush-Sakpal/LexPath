import { IoMdSearch } from "react-icons/io";

function HeroSearchbar() {
  return <div className=" w-full md:w-1/2 flex my-18 rounded-3xl">
    <input type="text" placeholder="Search by college, exam, or career" className="text-primary bg-white on focus:outline-none w-full text-lg inline-block rounded-l-3xl px-4 py-2" />

    <button className="inline-block hover:cursor-pointer rounded-r-3xl bg-accentPrimary px-2 border-r-2 border-t-2 border-b-2 border-white"><IoMdSearch className="bg-accentPrimary h-full w-full text-3xl rounded-r-3xl"/></button>
  </div>
}

export default HeroSearchbar;