import { existsSync, readdirSync } from "node:fs";

export type Photo = {
  src: string;
  alt: string;
  title?: string;
  country?: string;
  width?: number;
  height?: number;
  featured?: boolean;
};

export const tripPhotoFolder = "/photos/trips/";
const tripPhotoDirectory = new URL("../../public/photos/trips/", import.meta.url);
const imageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

export const photoDetails: Record<string, Partial<Omit<Photo, "src">>> = {};

function titleFromSlug(slug: string): string {
  return slug
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isImageFile(filename: string): boolean {
  const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return imageExtensions.has(extension);
}

function getCountryEntries(): Array<{ country?: string; filename: string }> {
  const rootEntries = readdirSync(tripPhotoDirectory, { withFileTypes: true });
  const loosePhotos = rootEntries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => ({ filename: entry.name }));

  const countryPhotos = rootEntries
    .filter((entry) => entry.isDirectory())
    .flatMap((countryDirectory) => {
      const countryUrl = new URL(`${countryDirectory.name}/`, tripPhotoDirectory);

      return readdirSync(countryUrl, { withFileTypes: true })
        .filter((entry) => entry.isFile() && isImageFile(entry.name))
        .map((entry) => ({
          country: titleFromSlug(countryDirectory.name),
          filename: `${countryDirectory.name}/${entry.name}`,
        }));
    });

  return [...countryPhotos, ...loosePhotos].sort((entryA, entryB) =>
    entryA.filename.localeCompare(entryB.filename)
  );
}

function getTripPhotos(): Photo[] {
  if (!existsSync(tripPhotoDirectory)) return [];

  return getCountryEntries().map(({ country, filename }, index) => {
    const imageName = filename.split("/").at(-1) || filename;
    const title = titleFromSlug(imageName);
    const details = photoDetails[filename] || {};

    return {
      src: `${tripPhotoFolder}${filename}`,
      alt: details.alt || `Trip photo: ${title}`,
      title: details.title || title,
      country: details.country || country,
      featured: details.featured ?? index < 6,
      width: details.width,
      height: details.height,
    };
  });
}

export const tripPhotos: Photo[] = getTripPhotos();

export const hasTripPhotos = tripPhotos.length > 0;
export const galleryPhotos = tripPhotos;
export const featuredPhotography = tripPhotos
  .filter((photo) => photo.featured)
  .slice(0, 6);
