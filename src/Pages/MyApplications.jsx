import { Suspense, useContext } from "react";
import MyApplicationList from "../Components/MyApplicationList";
import { AuthContext } from "../Provider/AuthContext";
import { myApplicationPromise } from "../api/applicationApi";
import Loading from "../Components/Loading";

const MyApplications = () => {
    const { user } = useContext(AuthContext);

return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-10  tracking-wide">
            My Applications
        </h1>

        <Suspense fallback={<Loading />}>
            <MyApplicationList myApplicationPromise={myApplicationPromise(user.email)} />
        </Suspense>
    </div>
);
};

export default MyApplications;