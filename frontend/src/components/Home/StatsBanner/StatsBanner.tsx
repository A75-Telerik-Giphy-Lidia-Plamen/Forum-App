import { useEffect, useState } from "react";
import { getPlatformStats } from "../../../services/stats.service";
import StatCard from "./StatsCard";
import { User, StickyNote, MessageCircle, Tags } from "lucide-react";
import { statsStyles as s} from "./StatsBanner.styles";


type Stats = {
    users: number,
    posts: number,
    comments: number,
    tags: number,
}

export default function StatsBanner() {
    const [stats, setStats] = useState<Stats>({
        users: 0,
        posts: 0,
        comments: 0,
        tags: 0,
    });

    useEffect(() => {
        getPlatformStats().then(setStats);
    }, [stats]);

    return (
        <section className={s.section}>
            <div className={s.container}>
                <div className={s.grid}>
                    <StatCard value={stats.users} label="Community Members" icon={User} />
                    <StatCard value={stats.posts} label="Posts Created" icon={StickyNote} />
                    <StatCard value={stats.comments} label="Comments Shared" icon={MessageCircle} />
                    <StatCard value={stats.tags} label="Skills Preserved" icon={Tags} />
                </div>
            </div>
        </section>
    )
}