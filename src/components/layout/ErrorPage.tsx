import { Link } from "react-router";

interface ErrorPageProps {
    type?: 'not-found' | 'error';
    title?: string;
    description?: string;
}

const ErrorPage = ({ type = 'error', title = "Something went wrong", description = "please try again after some time" }: ErrorPageProps) => {
    if (type === "not-found") {
        return (
            <div className="flex flex-col items-center justify-center h-screen max-h-[70vh] bg-gray-100 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-400">404</h1>
                <p className="text-xl text-gray-800 mt-4">Page Not Found</p>
                <p className="text-gray-600 mt-2">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen max-h-[70vh] bg-gray-100 px-4 text-center">
            <p className="text-2xl text-gray-800 mt-4">{title}</p>
            <p className="text-gray-600 mt-2">{description} </p>
            <Link
                to="/"
                className="text-xs mt-4 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    )
}

export default ErrorPage