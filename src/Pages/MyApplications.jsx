import { Suspense, useContext } from "react";
import MyApplicationlist from "../Components/MyApplicationlist";
import { AuthContext } from "../Provider/AuthContext";
import { myApplicationPromise } from "../api/applicationApi";
import Loading from "../Components/Loading";

const MyApplications = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10 mb-5 text-[#4B0082]'>My Applications</h1>

            <ul className="list bg-base-100 rounded-box shadow-md">

                <Suspense fallback={<Loading />}>
                    <MyApplicationlist myApplicationPromise={myApplicationPromise(user.email)} />
                </Suspense>

            </ul>
        </div>
    );
};

export default MyApplications;