const BASE_URL = "http://20.244.56.144/evaluation-service";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjAzMzMxLCJpYXQiOjE3NDM2MDMwMzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ2MzdhZDdlLTc2ZGYtNGQ3ZC04MmMxLWVkMGY0MTVmNzk4NCIsInN1YiI6IjIyMDUyNDY3QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MjQ2N0BraWl0LmFjLmluIiwibmFtZSI6InRhbmlzaHEgbmlnYW0iLCJyb2xsTm8iOiIyMjA1MjQ2NyIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6ImQ2MzdhZDdlLTc2ZGYtNGQ3ZC04MmMxLWVkMGY0MTVmNzk4NCIsImNsaWVudFNlY3JldCI6InhGZ3N5ektNUlVGdWVQcXgifQ.lcQp0shif40ubJ3JJn5HUotl2WjOdw-OrcwMV22fbOY";

const fetchAPI = async (endpoint: string) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
};

export const getUsers = async (): Promise<{ [key: string]: string }> => {
    return fetchAPI("/users");
};

export const getUserPosts = async (userId: number) => {
    const data = await fetchAPI(`/users/${userId}/posts`);
    return data.posts;
};

export const getPostComments = async (postId: number) => {
    const data = await fetchAPI(`/posts/${postId}/comments`);
    return data.comments;
};
