export {};

declare global {
  interface ReactNativeFile {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: string | Blob | ReactNativeFile): void;
  }
}
