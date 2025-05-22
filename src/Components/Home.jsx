import FeaturedTasks from "./FeaturedTasks";
import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import SnapTaskerFeatures from "./SnapTaskerFeatures";

const Home = () => {
    return (
        <div className="mb-20 space-y-40">
            <Hero></Hero>
            <FeaturedTasks></FeaturedTasks>
            <FeaturesSection></FeaturesSection>
            <SnapTaskerFeatures></SnapTaskerFeatures>
        </div>
    );
};

export default Home;