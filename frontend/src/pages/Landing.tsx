import Navbar from "../components/NavBar";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow text-center p-8 bg-gray-100">
        <h2 className="text-6xl font-extrabold mb-6">
          Rescue Food, Feed Communities
        </h2>
        <p className="text-xl max-w-2xl mb-8">
          Join our mission to reduce food waste and fight hunger by connecting
          donors with recipients.
        </p>
        <div className="space-x-4">
          <a
            href="/donor"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Donate Food
          </a>
          <a
            href="/recipient"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Claim Food
          </a>
        </div>
      </section>
      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 p-8">
        <div className="p-6 bg-white shadow rounded">
          <h3 className="font-bold text-xl mb-2">Easy Donations</h3>
          <p>Quickly list surplus food with details and photos.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="font-bold text-xl mb-2">Real-time Matching</h3>
          <p>Recipients can claim donations instantly.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="font-bold text-xl mb-2">Impact Analytics</h3>
          <p>Track meals rescued and community impact.</p>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-green-600 text-white text-center p-4">
        <p>© 2026 Food Rescue Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
