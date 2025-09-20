import AuthButton from './AuthButton';
import NavbarButton from './NavbarButton';

function Navbar() {
  return <div className='bg-accentPrimary px-9 py-4 text-white shadow-xl sticky top-0'>
    <ul className="flex justify-between">
      <div>
        <NavbarButton name = {'Home'} to="/" />
        <NavbarButton name = {'Colleges'} to="/colleges" />
        <NavbarButton name = {'Careers'} to="/careers" />
        <NavbarButton name = {'Mock Tests'} to="/mock_tests" />
        <NavbarButton name = {'Jobs'} to="/jobs" />
        <NavbarButton name= {'Dashboard'} to="/dashboard" />
      </div>
      
      <AuthButton name = {'Login'}/>
    </ul>
  </div>
}

export default Navbar;