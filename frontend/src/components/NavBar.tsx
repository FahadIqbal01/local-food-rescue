function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
      <h1 className="text-xl font-bold">Food Rescue</h1>
      <div className="space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/login" className="hover:underline">
          Login
        </a>
        <a href="/register" className="hover:underline">
          Register
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
