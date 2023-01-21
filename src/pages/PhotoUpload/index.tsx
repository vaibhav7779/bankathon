import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import { useNavigate } from "react-router";
// source code : ./src/demo/AppWithImagePreview/ImagePreview

function PhotoUpload() {
  const [dataUri, setDataUri] = useState("");
  const navigate = useNavigate();

  function handleTakePhotoAnimationDone(dataUri: any) {
    setDataUri(dataUri);
  }

  const isFullscreen = false;
  return (
    <div>
      {dataUri ? (
       window.location.href = "/?success"
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
        />
      )}
    </div>
  );
}


export default PhotoUpload;
