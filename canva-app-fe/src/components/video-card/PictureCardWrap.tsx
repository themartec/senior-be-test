import { upload } from "@canva/asset";
import "./VideoCard.css";
import {
  Rows,
  Title,
  ImageCard,
  Text,
  Columns,
  Column,
} from "@canva/app-ui-kit";
import { addNativeElement, ui } from "@canva/design";
import { STATIC_ASSET_URL } from "src/constant";

function PictureCardWrap({ title, author, url, mimeType }) {
  const uploadExternalImage = () => {
    return upload({
      mimeType: mimeType,
      thumbnailUrl: STATIC_ASSET_URL + encodeURIComponent(url),
      type: "IMAGE",
      url: STATIC_ASSET_URL + encodeURIComponent(url),
      width: 320,
      height: 212,
    });
  };

  const onClickImage = async () => {
    const { ref } = await uploadExternalImage();
    await addNativeElement({ type: "IMAGE", ref });
  };

  const onDragStartForExternalImage = (event: React.DragEvent<HTMLElement>) => {
    ui.startDrag(event, {
      type: "IMAGE",
      resolveImageRef: uploadExternalImage,
      previewUrl: STATIC_ASSET_URL + encodeURIComponent(url),
      previewSize: {
        width: 320,
        height: 212,
      },
      fullSize: {
        width: 320,
        height: 212,
      },
    });
  };

  return (
    <div>
      <Columns spacing="2u">
        <Column width="2/4">
          <ImageCard
            ariaLabel="Add video to design"
            borderRadius="none"
            thumbnailUrl={STATIC_ASSET_URL + url}
            onClick={onClickImage}
            onDragStart={onDragStartForExternalImage}
          />
        </Column>
        <Column>
          <Rows spacing="0.5u">
            <Title lineClamp={2} size="large">
              {title}
            </Title>
            <Text size="medium">{author}</Text>
            <Text size="small">Click or drag to add into design</Text>
          </Rows>
        </Column>
      </Columns>
    </div>
  );
}

export default PictureCardWrap;
