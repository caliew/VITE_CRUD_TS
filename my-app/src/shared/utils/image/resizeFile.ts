import { RcFile } from 'antd/lib/upload';
import Resizer from 'react-image-file-resizer';

export interface ResizeFilePayload {
  maxWidth: number;
  maxHeight: number;
  compressFormat: 'jpeg' | 'png' | 'jpg';
  quality: number;
  rotation?: number;
  responseUriFunc?: (uri: string | File | Blob | RcFile | ProgressEvent<FileReader>) => void;
  outputType?: 'file' | 'base64' | 'blob';
  minWidth?: number;
  minHeight?: number;
}

export const resizeFile = (
  file: File | RcFile,
  {
    compressFormat,
    maxHeight = 300,
    maxWidth = 300,
    minHeight,
    minWidth,
    outputType,
    quality,
    responseUriFunc,
    rotation = 0,
  }: ResizeFilePayload
) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      responseUriFunc ??
        ((uri) => {
          resolve(uri);
        }),
      outputType,
      minWidth,
      minHeight
    );
  });
