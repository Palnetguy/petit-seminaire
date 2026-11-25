/**
 * Resize a photo in the browser before upload: phones produce 4000px, 8 MB
 * images; the website never needs more than ~1800px. This keeps uploads small
 * and fast on school internet connections.
 */
export async function resizeImage(file: File, max = 1800, quality = 0.82): Promise<{ upload: string; name: string }> {
  if (!/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) && !/\.(jpe?g|png|webp)$/i.test(file.name)) {
    throw new Error("Please choose a JPEG, PNG or WebP photo.");
  }
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error("This photo could not be read. Try exporting it as JPEG.");
  });
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser cannot process images.");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return { upload: canvas.toDataURL("image/jpeg", quality), name: file.name };
}
