import {
  generateOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_ALT,
  OG_IMAGE_CONTENT_TYPE,
} from '../lib/generateOgImage';

export const size = OG_IMAGE_SIZE;
export const alt = OG_IMAGE_ALT;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function TwitterImage() {
  return generateOgImageResponse();
}
