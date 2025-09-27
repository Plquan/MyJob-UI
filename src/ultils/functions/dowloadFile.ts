import env from '../../constant/env';
import slugify from './customSlug';

const APP_NAME = env.APP_NAME;

/**
 * 
 * @param url - Đường dẫn file
 * @param fileName - Tên hiển thị (không cần đuôi)
 */
const downloadFile = async (url: string, fileName: string): Promise<void> => {
  try {
    const fileDownloadName = `${APP_NAME}_CV-${slugify(fileName || 'mytitle')}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Download failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);

    const extensionMatch = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
    const extension = extensionMatch ? extensionMatch[1] : 'bin'; 

    const link = document.createElement('a');
    link.href = urlBlob;
    link.setAttribute('download', `${fileDownloadName}.${extension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlBlob);
  } catch (error) {
    console.error('Download file error:', error);
  }
};
export default downloadFile;
