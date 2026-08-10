import httpService from "./httpService";

export const captureSitesApi = async (data) => {
  try {
    const response = await httpService.post("/capture-sites", data);
    return response.data;
  } catch (error) {
    console.error("captureSitesApi error:", error);
    throw error;
  }
};
