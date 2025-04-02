const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BASE_URL = "http://20.244.56.144/evaluation-service";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNTc0MzQOLCJpYXQi0jE3NDM1NzQwNDQsImlzcyI6IkFmZm9yZG11ZCIsImp0aSI6ImQ5Y2JiNjk5LTZhMjctNDRhNS04ZDU5LThiMWJlZmE4MTZkYSIsInN1YiI6InJhbWtyaXNobkBhYmMuZWR1In0sInVtYWlsIjoicmFta3Jpc2huYUBhYmMuZWR1IiwibmFtZSI6InJhbSBrcmlzaG5hIiwicm9sbE5vIjoiYWExYmIiLCJhY2Nlc3NDb2RlIjoieGdBc05DIiwiY2xpZW50SUQiOiJkOWNiYjY5OS02YTI3LTQ0YTUtOGQ1OS04YjFiZWZhODE2ZGEiLCJjbGllbnRTZWNyZXQiOiJ0VkphYWFSQlNlWGNTWHVNIn0.YApD98gq0IN_OWw7JMfmuUfK1m4hLTm7AIcLDCLAzVg";

// 🛠️ Utility function to fetch posts for a user
const getUserPosts = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });
        return response.data.posts.length;
    } catch (error) {
        console.error(`❌ Error fetching posts for user ${userId}:`, error.response?.data || error.message);
        return 0; // If request fails, assume 0 posts
    }
};

app.get("/users", async (req, res) => {
    try {
        console.log("🚀 Fetching top users...");
        const userIds = Array.from({ length: 50 }, (_, i) => i + 1);
        const postCounts = [];

        for (const userId of userIds) {
            const count = await getUserPosts(userId);
            postCounts.push({ userId, postCount: count });
        }

        const topUsers = postCounts
            .filter(user => user.postCount > 0) // Exclude users with 0 posts
            .sort((a, b) => b.postCount - a.postCount)
            .slice(0, 5);

        console.log("✅ Top users:", topUsers);
        res.json(topUsers);
    } catch (err) {
        console.error("❌ Server Error:", err.message);
        res.status(500).json({ error: "Failed to fetch top users" });
    }
});

app.listen(5000, () => console.log("🔥 Server running on port 5000"));
