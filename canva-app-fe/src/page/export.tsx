import React, { useState } from "react";
import {
  Rows,
  Title,
  VideoCard,
  Text,
  Badge,
  Columns,
  Column,
  TextInput,
  ClearDecorator,
  SearchIcon,
  Button,
  ExportIcon,
} from "@canva/app-ui-kit";
import { ExportResponse, requestExport } from "@canva/design";

const EXPORT_TO_STORY = `${BACKEND_HOST}/canva/plugin/story/export`;

export default function Export(props) {
  const [state, setState] = useState<"exporting" | "idle">("idle");
  const [exportResponse, setExportResponse] = useState<
    ExportResponse | undefined
  >();
  const exportDocument = async () => {
    if (state === "exporting") return;
    try {
      setState("exporting");

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

      // TODO: Send the URL to your backend using fetch
      setExportResponse(response);
    } catch (error) {
      // TODO: Add error handling
      console.log(error);
    } finally {
      setState("idle");
    }
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <TextInput
          end={<ClearDecorator />}
          placeholder="Start typing for clear button to appear"
          start={<SearchIcon />}
        />
      </div>
      <Rows spacing="1u">
        <div style={{}}>
          <Columns spacing="2u">
            <Column width="2/4">
              <VideoCard
                ariaLabel="Add video to design"
                borderRadius="none"
                // bottomEnd={<Badge text="video" tone="contrast" />}
                durationInSeconds={8}
                mimeType="video/mp4"
                onClick={() => {}}
                onDragStart={() => {}}
                thumbnailUrl="https://www.canva.dev/example-assets/video-import/beach-thumbnail-image.jpg"
                videoPreviewUrl="https://www.canva.dev/example-assets/video-import/beach-thumbnail-video.mp4"
              />
            </Column>
            <Column>
              <Rows spacing="0.5u">
                <Title lineClamp={2} size="xsmall">
                  Video title with very long tile generated in verasdn jas hdan
                  sdakjsd as dln
                </Title>
                <Text size="small">Author</Text>
                <Text size="small">Story</Text>
              </Rows>
            </Column>
          </Columns>
        </div>
        <div>
          <Columns spacing="2u">
            <Column width="1/3">
              <VideoCard
                ariaLabel="Add video to design"
                borderRadius="none"
                bottomEnd={<Badge text="custom" tone="contrast" />}
                durationInSeconds={8}
                mimeType="video/mp4"
                onClick={() => {}}
                onDragStart={() => {}}
                thumbnailUrl="https://www.canva.dev/example-assets/video-import/beach-thumbnail-image.jpg"
                videoPreviewUrl="https://www.canva.dev/example-assets/video-import/beach-thumbnail-video.mp4"
              />
            </Column>
            <Column>
              <Rows spacing="0.5u">
                <Title size="xsmall">Video Card with decorator</Title>
                <Text size="small">
                  Visibility: shown on hover (default behavior).
                </Text>
                <Button
                  alignment="center"
                  icon={() => <ExportIcon />}
                  onClick={exportDocument}
                  loading={state === "exporting"}
                  variant="secondary"
                >
                  Export to this story
                </Button>
              </Rows>
            </Column>
          </Columns>
        </div>
      </Rows>
    </>
  );
}
