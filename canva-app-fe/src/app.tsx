import type { Authentication } from "@canva/user";
import { auth } from "@canva/user";
import {
  Box,
  Button,
  ClearDecorator,
  ExportIcon,
  LoadingIndicator,
  Rows,
  SearchIcon,
  Text,
  TextInput
} from "@canva/app-ui-kit";
import React, { useState, useEffect } from "react";
import VideoList from "./page/video-list";
import { ExportResponse, requestExport } from "@canva/design";
import styles from "styles/components.css";
import {checkAuthenticationStatus, exportFile, findAssetByKey, getAllAssets} from "./api/asset-api";


export const App = () => {
  // Keep track of the user's authentication status.
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [exportState, setExportState] = useState<"exporting" | "idle">("idle");
  const [exportResponse, setExportResponse] = useState<
    ExportResponse | undefined
  >();
  const [assets, setAssets] = useState<AssetResponse[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    const token = await auth.getCanvaUserToken();
    const response = await getAllAssets(token);
    console.log("res", response);
    setAssets(response);
    setLoading(false);
  };

  const searchAsset = async (keyword: string) => {
    const token = await auth.getCanvaUserToken();
    const response = await findAssetByKey(token, keyword);
    console.log("res search", response);
    setAssets(response);
    setLoading(false);
  }


  useEffect(() => {
    checkAuthenticationStatus(auth).then((status) => {
      setAuthState(status);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [exportState]);

  const createAuthenticationMessage = (state: AuthState) => {
    switch (state) {
      case "checking":
        return "Checking authentication status...";
      case "authenticated":
        return "You are authenticated!";
      case "not_authenticated":
        return "You are not authenticated.";
      default:
        console.error("Unknown authentication response: ", state);
    }
  };

  const startAuthenticationFlow = async () => {
    // Start the authentication flow
    try {
      const response = await auth.requestAuthentication();
      const status = response.status;
      switch (status) {
        case "COMPLETED":
          setAuthState("authenticated");
          break;
        case "ABORTED":
          console.warn("Authentication aborted by user.");
          setAuthState("not_authenticated");
          break;
        case "DENIED":
          console.warn("Authentication denied by user", response.details);
          setAuthState("not_authenticated");
          break;
        default:
          console.error("Unknown authentication response: ", status);
      }
    } catch (e) {
      console.error(e);
      setAuthState("error");
    }
  };

  const exportDocument = async () => {
    if (exportState === "exporting") return;
    try {
      setExportState("exporting");

      const response = await requestExport({
        acceptedFileTypes: [
          "PNG",
          "PDF_STANDARD",
          "JPG",
          "GIF",
          "SVG",
          "VIDEO",
          "PPTX",
        ],
      });
      const token = await auth.getCanvaUserToken();
      setExportResponse(response);
      await exportFile(token, response);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setExportState("idle");
    }
  };

  switch (authState) {
    case "error":
      return (
        <div>
          <Text>
            <Text variant="bold" tagName="span">
              Something went wrong.
            </Text>{" "}
            Check the JavaScript Console for details.
          </Text>
        </div>
      );

    case "authenticated":
      return (
        <div style={{ paddingRight: "15px", height: "90%" }}>
          <div style={{ marginBottom: "20px" }}>
            <TextInput
                end={<ClearDecorator />}
                placeholder="Search by title"
                start={<SearchIcon />}
                onChange={keyword => searchAsset(keyword)}
            />
          </div>
          <div className={styles.scrollContainer} style={{ height: "90%" }}>
            <VideoList isLoading={loading} assets={assets}></VideoList>
          </div>
          <div style={{ paddingTop: "15px" }}>
            <Rows spacing="3u">
              <Button
                alignment="center"
                icon={() => <ExportIcon />}
                onClick={exportDocument}
                loading={exportState === "exporting"}
                variant="secondary"
              >
                Export current design to asset store
              </Button>
            </Rows>
          </div>
        </div>
      );

    case "checking":
      return (
          <div>
            <Rows spacing="3u">
              <Box>
              </Box>
              <LoadingIndicator size={"medium"}/>
            </Rows>
          </div>
      )
    default:
      return (
        <div>
          <Rows spacing="3u">
            <Box>
              <Text alignment="center">
                {createAuthenticationMessage(authState)}
              </Text>
            </Box>
            <Button variant="primary" onClick={startAuthenticationFlow} stretch>
              Start authentication flow
            </Button>
          </Rows>
        </div>
      );
  }
};
