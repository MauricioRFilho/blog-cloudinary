import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

export interface CloudinaryUploadResult {
  public_id: string
  version: number
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  original_filename: string
}

export async function uploadImage(
  file: File,
  folder: string = 'blog'
): Promise<CloudinaryUploadResult> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: 'auto',
          transformation: [
            { width: 1200, height: 630, crop: 'fill' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as CloudinaryUploadResult)
        }
      )
      .end(buffer)
  })
}

export function getOptimizedImageUrl(
  publicId: string,
  options?: {
    width?: number
    height?: number
    crop?: string
    quality?: string | number
    format?: string
  }
): string {
  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options || {}

  const transformations = []
  if (width || height) {
    transformations.push(`w_${width || 'auto'},h_${height || 'auto'},c_${crop}`)
  }
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)

  return cloudinary.url(publicId, {
    transformation: transformations.join(','),
    secure: true,
  })
}
