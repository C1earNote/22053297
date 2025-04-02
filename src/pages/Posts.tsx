import { useEffect, useState } from "react";
import { getUsers, getUserPosts, getPostComments } from "@/services/api";

const Posts = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [type, setType] = useState<"popular" | "latest">("latest");

    useEffect(() => {
        const fetchPosts = async () => {
            const users = await getUsers();
            let allPosts: any[] = [];

            await Promise.all(
                Object.keys(users).map(async userId => {
                    allPosts.push(...(await getUserPosts(Number(userId))));
                })
            );

            if (type === "popular") {
                const commentCounts = await Promise.all(
                    allPosts.map(async post => ({
                        ...post,
                        commentCount: (await getPostComments(post.id)).length
                    }))
                );
                commentCounts.sort((a, b) => b.commentCount - a.commentCount);
                setPosts(commentCounts);
            } else {
                allPosts.sort((a, b) => b.id - a.id);
                setPosts(allPosts.slice(0, 5));
            }
        };

        fetchPosts();
    }, [type]);

    return (
        <div>
            <h1>{type === "popular" ? "Top Posts" : "Latest Posts"}</h1>
            <button onClick={() => setType("latest")}>Latest</button>
            <button onClick={() => setType("popular")}>Popular</button>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>Post ID: {post.id}</h2>
                    <p>{post.content}</p>
                    {type === "popular" && <p>Comments: {post.commentCount}</p>}
                </div>
            ))}
        </div>
    );
};

export default Posts;
