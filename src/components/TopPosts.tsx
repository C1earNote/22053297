"use client";
import { useEffect, useState } from "react";
import { getUsers, getUserPosts, getPostComments } from "@/services/api";

interface Post {
    id: number;
    userId: number;
    content: string;
    commentCount?: number;
}

const TopPosts = () => {
    const [topPosts, setTopPosts] = useState<Post[]>([]);
    const [latestPosts, setLatestPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const users = await getUsers();
                let allPosts: Post[] = [];

                for (const userId of Object.keys(users)) {
                    const userPosts = await getUserPosts(Number(userId));
                    allPosts.push(...userPosts);
                }

                // Sort by latest
                setLatestPosts([...allPosts].sort((a, b) => b.id - a.id).slice(0, 5));

                // Fetch comments for each post
                const commentCounts = await Promise.all(
                    allPosts.map(async post => ({
                        ...post,
                        commentCount: (await getPostComments(post.id)).length,
                    }))
                );

                // Sort by most commented
                setTopPosts(commentCounts.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0)));
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Top Posts</h1>
            {topPosts.map(post => (
                <div key={post.id}>
                    <p>{post.content}</p>
                    <p>Comments: {post.commentCount}</p>
                </div>
            ))}

            <h1>Latest Posts</h1>
            {latestPosts.map(post => (
                <div key={post.id}>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default TopPosts;