import CallToAction from "./CallToAction";
import FAQ from "./FAQ";
import FeaturedTasks from "./FeaturedTasks";
import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import SnapTaskerFeatures from "./SnapTaskerFeatures";
import Team from "./Team";

const Home = () => {
    return (
        <div className="mb-20 space-y-14 lg:space-y-18">
            <Hero></Hero>
            <FeaturedTasks></FeaturedTasks>
            <FeaturesSection></FeaturesSection>
            <SnapTaskerFeatures></SnapTaskerFeatures>
            <FAQ></FAQ>
            <Team></Team>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;