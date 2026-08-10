import httpService from "./httpService";

// Helper to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const signinApi = async (data) => {
  try {
    // const response = await httpService.post("/auth/signin", data);
    // return response.data;
    await delay(500);
    return {
      success: true,
      token: "mock-jwt-token-role-admin", // Mock token
      user: { role: "admin", email: data.email },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signupApi = async (data, token) => {
  try {
    // const response = await httpService.post("/auth/signup", data, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // return response.data;
    await delay(500);
    return { success: true, message: "User signed up successfully (mock)" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserApi = async (id, data, token) => {
  try {
    // const response = await httpService.put(`/auth/update-user/${id}`, data, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // return response.data;
    await delay(500);
    return { success: true, message: "User updated successfully (mock)" };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getAllUsersApi = async (token) => {
  try {
    // const response = await httpService.get("/auth/all-users", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // return response.data;
    await delay(500);
    return {
      success: true,
      users: [
        { _id: "1", username: "Admin User", email: "admin@example.com", role: "admin" },
        { _id: "2", username: "Demo User", email: "demo@example.com", role: "qa" },
      ],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  // window.location.href = "/signin"; 
  // Redirect to home since signin is now get started
  window.location.href = "/";
};

export const createMultipleUsersApi = async (users, token) => {
  try {
    // const response = await httpService.post(
    //   "/auth/create-multiple-users",
    //   { users },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // return response.data;
    await delay(500);
    return { success: true, message: "Multiple users created successfully (mock)" };
  } catch (error) {
    console.error("Error creating multiple users:", error);
    throw error;
  }
};

export const adminResetUserPasswordApi = async (id, newPassword, token) => {
  try {
    // const response = await httpService.put(
    //   `/auth/admin-reset-password/${id}`,
    //   { newPassword },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // return response.data;
    await delay(500);
    return { success: true, message: "Password reset successfully (mock)" };
  } catch (error) {
    console.error("Error resetting user password:", error);
    throw error;
  }
};

