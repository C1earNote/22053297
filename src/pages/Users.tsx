import { useEffect, useState } from "react";
import { getUsers, getUserPosts } from "@/services/api";

const Users = () => {
    const [topUsers, setTopUsers] = useState<{ userId: number; name: string; postCount: number }[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            const userPostCounts = await Promise.all(
                Object.entries(users).map(async ([id, name]) => ({
                    userId: Number(id),
                    name: name as string, // Explicitly cast `name` to string
                    postCount: (await getUserPosts(Number(id))).length
                }))
            );
        
            setTopUsers(userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5));
        };

        fetchUsers();
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

export default Users;