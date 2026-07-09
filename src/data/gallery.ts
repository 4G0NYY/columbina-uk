/**
 * Gallery configuration.
 *
 * Like the secret gifs, the site ships WITHOUT bundling any HoYoverse or
 * community imagery. To build the gallery, drop image files into
 * `public/assets/gallery/` and describe them here, one entry each. Always
 * credit the artist and link the source; the grid renders the attribution
 * beneath every piece. If this array is empty, the gallery shows a tasteful
 * placeholder explaining how to fill it.
 *
 * Example:
 *   {
 *     src: "/assets/gallery/silvermoon-rest.webp",
 *     title: "Rest at Silvermoon Hall",
 *     artist: "Your Name",
 *     source: "https://…",
 *     credit: "© the artist, shared with permission",
 *   }
 */
export interface GalleryItem {
  src: string;
  title: string;
  artist: string;
  /** Link to the original posting / artist page. */
  source?: string;
  /** Short licence or permission note shown under the piece. */
  credit?: string;
  /** Optional taller/wider hint for the masonry-ish grid. */
  tall?: boolean;
}

export const GALLERY: GalleryItem[] = [];
