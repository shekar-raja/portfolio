/**
 * Converts a Google Drive share URL to a Drive /preview URL suitable for embedding in an iframe.
 * Handles both /view and /edit share URL formats.
 *
 * Example input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Example output: https://drive.google.com/file/d/FILE_ID/preview
 */
export function getDrivePreviewUrl(shareUrl: string): string {
  const match = shareUrl.match(/\/file\/d\/([^/]+)/);
  if (!match) {
    throw new Error(
      `Could not extract file ID from Google Drive URL: ${shareUrl}`,
    );
  }
  return `https://drive.google.com/file/d/${match[1]}/preview`;
}
