'use client'

import { useState, type ChangeEvent } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface CloudinaryUploadProps {
  onUploadComplete?: (url: string) => void
  folder?: string
}

export function CloudinaryUpload({
  onUploadComplete,
  folder = 'blog',
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await response.json()
      onUploadComplete?.(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-muted-foreground/50">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {uploading ? 'Uploading...' : 'Click to upload image'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                JPEG, PNG, WebP, GIF up to 10MB
              </p>
            </div>
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {preview && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src={preview} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  )
}
