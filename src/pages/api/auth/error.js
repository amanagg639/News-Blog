import { useRouter } from 'next/router';

const Error = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 p-6 rounded shadow-md w-full sm:w-96">
        <h2 className="text-xl font-bold text-red-600 mb-4">Authentication Error</h2>
        <p className="text-gray-700">
          There was an error while logging in. Please try again.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push('/auth/login')}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Error;
