import { addNativeElement, ui, VideoDragConfig } from "@canva/design";
import "./VideoCard.css";
import {
  Rows,
  Title,
  VideoCard,
  Text,
  Columns,
  Column,
  Button,
  ExportIcon,
} from "@canva/app-ui-kit";
import { upload } from "@canva/asset";
import { STATIC_ASSET_URL } from "src/constant";

function VideoCardWrap({ mimeType, title, author, url }) {
  const uploadVideo = () => {
    return upload({
      mimeType: mimeType,
      thumbnailImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOPNC8IVVkBB_5_yGlAtuFSZZt4R_NujjIOg&s",
      thumbnailVideoUrl: STATIC_ASSET_URL + encodeURIComponent(url),
      type: "VIDEO",
      url: STATIC_ASSET_URL + encodeURIComponent(url),
      width: 320,
      height: 180,
    });
  };

  const onClickVideo = async () => {
    const { ref } = await uploadVideo();
    return addNativeElement({ type: "VIDEO", ref });
  };

  const onDragStart = (event: React.DragEvent<HTMLElement>) => {
    const dragData: VideoDragConfig = {
      type: "VIDEO",
      resolveVideoRef: uploadVideo,
      previewSize: {
        width: 320,
        height: 180,
      },
      previewUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOPNC8IVVkBB_5_yGlAtuFSZZt4R_NujjIOg&s",
    };
    ui.startDrag(event, dragData);
  };

  return (
    <div>
      <Columns spacing="2u">
        <Column width="2/4">
          <VideoCard
            ariaLabel="Add video to design"
            borderRadius="none"
            mimeType={mimeType}
            onClick={onClickVideo}
            onDragStart={onDragStart}
            thumbnailUrl={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOPNC8IVVkBB_5_yGlAtuFSZZt4R_NujjIOg&s"
            }
            videoPreviewUrl={STATIC_ASSET_URL + encodeURIComponent(url)}
          />
        </Column>
        <Column>
          <Rows spacing="0.5u">
            <Title lineClamp={2} size="xsmall">
              {title}
            </Title>
            <Text size="small">{author}</Text>
          </Rows>
        </Column>
      </Columns>
    </div>
  );
}

export default VideoCardWrap;
