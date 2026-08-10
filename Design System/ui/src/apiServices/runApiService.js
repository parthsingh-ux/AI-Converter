// src/services/runApi.js
import httpService from "./httpService";

export const listRunsApi = async ({ page = 1, limit = 20, q = "" } = {}) => {
  try {
    const response = await httpService.get("/runs", {
      params: { page, limit, q },
    });
    return response.data;
  } catch (error) {
    console.error("listRunsApi error:", error);
    throw error;
  }
};

export const getRunApi = async (folder) => {
  try {
    const response = await httpService.get(
      `/runs/${encodeURIComponent(folder)}`
    );
    return response.data;
  } catch (error) {
    console.error("getRunApi error:", error);
    throw error;
  }
};

export const getRunPagesApi = async (folder) => {
  try {
    const response = await httpService.get(
      `/runs/${encodeURIComponent(folder)}/pages`
    );
    return response.data;
  } catch (error) {
    console.error("getRunPagesApi error:", error);
    throw error;
  }
};

export const getPageComparisonsApi = async (folder, pagePath) => {
  try {
    const response = await httpService.get(
      `/runs/${encodeURIComponent(folder)}/pages/${encodeURIComponent(
        pagePath
      )}/compare`
    );
    return response.data;
  } catch (error) {
    console.error("getPageComparisonsApi error:", error);
    throw error;
  }
};

export const getRunSummaryApi = async (folder) => {
  try {
    const response = await httpService.get(
      `/runs/${encodeURIComponent(folder)}/summary`
    );
    return response.data;
  } catch (error) {
    console.error("getRunSummaryApi error:", error);
    throw error;
  }
};
export const getRunComparisonsApi = async (folder) => {
  try {
    const response = await httpService.get(
      `/runs/getRunComparisons/${encodeURIComponent(folder)}`
    );
    return response.data;
  } catch (error) {
    console.error("getRunSummaryApi error:", error);
    throw error;
  }
};

export const archiveRunApi = async (folder, token) => {
  try {
    const response = await httpService.patch(
      `/runs/${encodeURIComponent(folder)}/archive`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("archiveRunApi error:", error);
    throw error;
  }
};
export const deleteRunApi = async (folder, token) => {
  try {
    const response = await httpService.delete(
      `/runs/${encodeURIComponent(folder)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("deleteRunApi error:", error);
    throw error;
  }
};

export const listArchivedRunsApi = async ({
  page = 1,
  limit = 20,
  q = "",
} = {}) => {
  try {
    const response = await httpService.get("/runs/archived", {
      params: { page, limit, q },
    });
    return response.data;
  } catch (error) {
    console.error("listArchivedRunsApi error:", error);
    throw error;
  }
};

export const restoreRunApi = async (folder, token) => {
  try {
    const response = await httpService.patch(
      `/runs/${encodeURIComponent(folder)}/archive`,
      { archived: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("restoreRunApi error:", error);
    throw error;
  }
};
