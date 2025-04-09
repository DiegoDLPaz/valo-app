export class Converter{
  convertToBase64(buffer: number[]): string {
    const byteArray = new Uint8Array(buffer);
    const base64String = btoa(String.fromCharCode(...byteArray));
    return `data:image/png;base64,${base64String}`;
  }
}
