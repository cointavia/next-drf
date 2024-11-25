import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <Head>
        <title>Welcome to Next-DRF 🚀</title>
      </Head>

      {/* Main Container */}
      <div className="text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          🚀 Welcome to Next-DRF!
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-700 mb-8">
          Your full-stack framework combining the power of <b>Next.js</b> and{" "}
          <b>Django REST Framework</b>.
        </p>

        {/* Features Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-left text-gray-600">
            <li>🚀 Seamless Frontend and Backend Integration</li>
            <li>⚡ Built-in Development and Production Scripts</li>
            <li>🔒 Flexible Authentication (AWS Cognito, JWT)</li>
            <li>🛠️ Fully Customizable Components</li>
          </ul>
        </div>

        {/* Developer Links */}
        <div className="space-y-4">
          <a
            href="/docs"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition"
          >
            📖 Read the Documentation
          </a>
          <a
            href="https://github.com/your-repo"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md shadow-md hover:bg-gray-300 transition"
          >
            ⭐ Star Us on GitHub
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500">
        <p>© 2024 Next-DRF Framework. All rights reserved.</p>
      </footer>
    </div>
  );
}
