import { ChangeEventHandler, useCallback, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

type Item = {
  x: number;
  y: number;
};

const calcZoomedImage = (
  img: HTMLImageElement,
  zoomRatio: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  const originWidth = img.naturalWidth;
  const originHeight = img.naturalHeight;

  const width = canvasWidth * zoomRatio;
  const height = (width / originWidth) * originHeight;

  const translateX = -(width - canvasWidth) / 2;
  const translateY = -(height - canvasHeight) / 2 + (height - canvasHeight) / 2;

  return { width, height, translateX, translateY };
};

const calcZoomRatio = (base: number, maxZoomRatio: number) => {
  const origin = maxZoomRatio * 0.01 - 0.01;
  const ratio = base * origin + 1;
  return ratio;
};

type Props = {
  src: string;
  canvasWidth: number;
  canvasHeight: number;
  maxZoomRatio: number;
  onSave: (blob: Blob) => void;
};

export const useImageCrop = ({
  canvasHeight,
  canvasWidth,
  maxZoomRatio,
  src,
  onSave,
}: Props) => {
  const [image, setImage] = useState<Item>({ x: 0, y: 0 });
  const [zoomedCordinate, setZoomedCordinate] = useState({ x: 0, y: 0 }); // ズーム時にズラすXY座標
  const [zoomRatio, setZoomRatio] = useState(1);
  const [imgCurrent, setImgCurrent] = useState<HTMLImageElement | null>(null);

  const imgRef = useCallback(
    async (element: HTMLImageElement | null) => {
      if (element) {
        // DOM作成後に画像の幅をcanvasの幅と同じ幅に調整
        const img = document.createElement("img");
        img.onload = () => {
          const { width, height, translateX, translateY } = calcZoomedImage(
            img,
            1,
            canvasWidth,
            canvasHeight
          );

          element.style.height = height + "px";
          element.style.width = width + "px";

          setZoomedCordinate({ x: translateX, y: translateY });
        };

        img.src = src;
      }
      setImgCurrent(element);
    },
    [imgCurrent]
  );

  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { x: image.x, y: image.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop(() => ({
    accept: "IMAGE",
    hover(item: Item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };

      const x = Math.round(item.x + delta.x);
      const y = Math.round(item.y + delta.y);

      setImage({ x, y });
    },
  }));

  const onCrop = async () => {
    const img = imgCurrent;
    if (!img) return;

    const canvas = document.createElement("canvas");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    const canvasRatio = canvasHeight / canvasWidth;
    const width = img.naturalWidth / zoomRatio;
    const height = width * canvasRatio;

    const actualX =
      image.x * (width / canvasWidth) +
      zoomedCordinate.x * (width / canvasWidth);
    const actualY =
      image.y * (height / canvasHeight) +
      zoomedCordinate.y * (height / canvasHeight);

    context.drawImage(
      img, // memo: naturalHeightとnaturalWidthでレンダリングされる
      -actualX,
      -actualY,
      width,
      height,
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    const blob = await getCanvasBlob(canvas);
    onSave(blob);
  };

  const onScale: ChangeEventHandler<HTMLInputElement> = (event) => {
    const base = Number(event.target.value);
    const zoomRatio = calcZoomRatio(base, maxZoomRatio);

    const img = imgCurrent;
    if (!img) return;

    const { width, height, translateX, translateY } = calcZoomedImage(
      img,
      zoomRatio,
      canvasWidth,
      canvasHeight
    );

    console.log("width", width);
    console.log("height", height);

    img.style.maxWidth = width + "px";
    img.style.width = width + "px";
    img.style.height = height + "px";
    img.style.maxHeight = height + "px";

    setZoomedCordinate({ x: translateX, y: translateY });
    setZoomRatio(zoomRatio);
  };

  function getCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise(function (resolve) {
      canvas.toBlob(function (blob) {
        if (blob) resolve(blob);
      });
    });
  }

  return {
    image,
    zoomedCordinate,
    isDragging,
    drag,
    drop,
    imgRef,
    onScale,
    onCrop,
  };
};
