interface AssetResponse {
  mimeType: string;
  author: string;
  title: string;
  assetUrl: string;
}
type AuthState = "authenticated" | "not_authenticated" | "checking" | "error";
