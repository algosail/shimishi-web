import type { FileStream } from 'jazz-tools'

export const getImageUrlFromFileStream = (file: FileStream): string | null => {
  const blob = file.toBlob()
  if (!blob) return null
  return URL.createObjectURL(blob)
}

const getImageUrlFromFile = (file: File | null): Promise<string | null> =>
  new Promise((res, rej) => {
    if (!file) return res(null)
    const reader = new FileReader()
    reader.addEventListener('load', function () {
      res(reader.result as string)
    })
    reader.readAsDataURL(file)
  })

export const getImageUrlFromFileList = async (files: FileList): Promise<string | null> => {
  const file = files.item(0)
  if (!file) return null
  return await getImageUrlFromFile(file)
}

export const isFileStream = (image: FileList | FileStream): image is FileStream =>
  !(image as any).item
export const isFileList = (image: FileList | FileStream): image is FileList => !!(image as any).item

export const getImageUrl = async (
  image: FileList | FileStream | undefined,
): Promise<string | null> => {
  if (!image) return null
  if (isFileStream(image)) return getImageUrlFromFileStream(image)
  if (isFileList(image)) return getImageUrlFromFileList(image)
  return null
}
