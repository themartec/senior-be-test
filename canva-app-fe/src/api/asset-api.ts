import { ExportResponse } from "@canva/design";
import {Authentication, CanvaUserToken} from "@canva/user";
import {keyword} from "chalk";

const GET_ALL_ASSET = `${BACKEND_HOST}/public/canva/assets`;
const EXPORT_CANVA_ASSET = `${BACKEND_HOST}/public/canva/story/export`;
const AUTHENTICATION_CHECK_URL = `${BACKEND_HOST}/public/canva/status`;
const DISCONNECT_APP = `${BACKEND_HOST}/public/canva/disconnect`;

export async function getAllAssets(
  token: CanvaUserToken
): Promise<AssetResponse[]> {
  try {
    const res = await fetch(GET_ALL_ASSET, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function disconnectAppApi(
    token: CanvaUserToken
): Promise<String> {
  try {
    const res = await fetch(DISCONNECT_APP, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
    return res.text();
  } catch (error) {
    console.error(error);
    return "cant_disconnect";
  }
}

export async function findAssetByKey(
    token: CanvaUserToken,
    keyword: string
): Promise<AssetResponse[]> {
  try {
    const res = await fetch(GET_ALL_ASSET + `?keyword=${keyword}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function exportFile(
  token: CanvaUserToken,
  exportData: ExportResponse
) {
  try {
    const res = await fetch(EXPORT_CANVA_ASSET, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(exportData),
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const checkAuthenticationStatus = async (
    auth: Authentication
): Promise<AuthStatus> => {
  try {
    const token = await auth.getCanvaUserToken();
    const res = await fetch(AUTHENTICATION_CHECK_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
    const body = await res.json();

    if (body?.isAuthenticated) {
      return {authState: "authenticated", body};
    } else {
      return {authState: "not_authenticated", body};
    }
  } catch (error) {
    console.error(error);
    return {authState: "not_authenticated", body: error};
  }
};
