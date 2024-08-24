import React, { useEffect, useState } from "react";
import {
  Rows,
  TextInput,
  ClearDecorator,
  SearchIcon,
  LoadingIndicator,
} from "@canva/app-ui-kit";
import { upload } from "@canva/asset";
import { auth } from "@canva/user";
import VideoCardWrap from "src/components/video-card/VideoCardWrap";
import PictureCardWrap from "src/components/video-card/PictureCardWrap";
import { IMAGE_MIME_TYPES, VIDEO_MIME_TYPES } from "src/constant";
import {findAssetByKey, getAllAssets} from "src/api/asset-api";
import styles from "../../styles/components.css";

function VideoList({assets, isLoading, onSearch}) {


  const renderCard = (item: AssetResponse, key: number) => {
    if (IMAGE_MIME_TYPES.has(item.mimeType)) {
      return (
        <PictureCardWrap
          title={item.title}
          author={item.author}
          mimeType={item.mimeType}
          key={key}
          url={item.assetUrl}
        />
      );
    } else if (VIDEO_MIME_TYPES.has(item.mimeType)) {
      return (
        <VideoCardWrap
          mimeType={item.mimeType}
          title={item.title}
          author={item.author}
          key={key}
          url={item.assetUrl}
        />
      );
    }
    return <div key={key}>Unsupported format</div>;
  };

  if (isLoading) {
    return <LoadingIndicator size="medium" />;
  }

  return (
    <>
      <Rows spacing="1u">
        {assets.map((item, index) => renderCard(item, index))}
      </Rows>
    </>
  );
}

VideoList.propTypes = {};

export default VideoList;
