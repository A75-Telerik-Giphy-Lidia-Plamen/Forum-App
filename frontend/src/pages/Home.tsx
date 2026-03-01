import HomeBanner from "../components/Home/HeroBanner/HeroBanner";
import StatsBanner from "../components/Home/StatsBanner/StatsBanner";
import TagsSection from "../components/Home/Tags/TagsSection";
import CTASection from "../components/ui/CTASection";
import PostsSection from "../components/Home/PostsSection"; 

export default function Home() {
    return (
        <>
            <HomeBanner />
            <StatsBanner />
            <TagsSection />
            <PostsSection />
            <CTASection />
        </>
    )
}