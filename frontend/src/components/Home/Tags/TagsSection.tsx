import { useEffect, useState } from "react";
import { getAllTags } from "../../../services/tags.service";
import TagPill from "./TagPill";

type Tag = {
    id: string;
    name: string;
};

export default function TagsSection() {
    const [tags, setTags] = useState<Tag[]>([]);
    useEffect(() => {
        getAllTags().then(setTags)
    },[tags]);
    return (
        <section className="py-12 bg-zinc-50 dark:bg-zinc-900">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
                    Categories of Knowledge
                </h2>

                <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                        <TagPill key={tag.id} id={tag.id} name={tag.name} />
                    ))}
                </div>
            </div>
        </section>
    );
}