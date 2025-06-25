import { Suspense, useContext } from "react";
import MyApplicationList from "../Components/MyApplicationList";
import { AuthContext } from "../Provider/AuthContext";
import { myApplicationPromise } from "../api/applicationApi";
import Loading from "../Components/Loading";

const MyApplications = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-50 to-purple-100">
            <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
                📄 My Applications
            </h1>

            <Suspense fallback={<Loading />}>
                <MyApplicationList myApplicationPromise={myApplicationPromise(user.email)} />
            </Suspense>
        </div>
    );
};

export default MyApplications;