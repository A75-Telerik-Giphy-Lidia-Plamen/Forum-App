import PostSection from "../ui/PostSection"
import { Flame, Heart, Clock } from "lucide-react";

export default function PostsSection() {
    return (
        <div className="min-h-screen bg-[#F5F0EB] px-6 py-12 dark:bg-[#1C1A18]">
            <div className="max-w-6xl mx-auto">

                <PostSection
                    title="Most Discussed"
                    sort="discussed"
                    icon={<Flame className="w-5 h-5 text-orange-500" />}
                />

                <PostSection
                    title="Popular"
                    sort="popular"
                    icon={<Heart className="w-5 h-5 text-red-500" />}
                />

                <PostSection
                    title="Latest"
                    sort="recent"
                    icon={<Clock className="w-5 h-5 text-zinc-500" />}
                />

            </div>
        </div>
    );
}