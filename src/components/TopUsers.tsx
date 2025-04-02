"use client";
import { useEffect, useState } from "react";
import { getUsers, getUserPosts } from "@/services/api";

interface User {
    userId: number;
    name: string;
    postCount: number;
}

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const users = await getUsers();
                const userPostCounts = await Promise.all(
                    Object.entries(users).map(async ([id, name]) => ({
                        userId: Number(id),
                        name,
                        postCount: (await getUserPosts(Number(id))).length,
                    }))
                );

                setTopUsers(userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchTopUsers();
    }, []);

    return (
        <div>
            <h1>Top 5 Users</h1>
            {topUsers.map(user => (
                <div key={user.userId}>
                    <h2>{user.name}</h2>
                    <p>Posts: {user.postCount}</p>
                </div>
            ))}
        </div>
    );
};

export default TopUsers;
