import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-bold mb-4">404 - Node Not Found</h2>
      <p className="mb-8 text-white/60">
        The requested synapse could not be established.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 md:min-h-0 items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors">
        Return to Galaxy
      </Link>
    </div>
  );
}
