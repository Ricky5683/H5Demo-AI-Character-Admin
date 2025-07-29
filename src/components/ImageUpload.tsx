import React, { useState } from 'react'
import { Upload, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { UPLOAD_CONFIG } from '@/utils/constants'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

interface ImageUploadProps {
  value?: string[]
  onChange?: (urls: string[]) => void
  maxCount?: number
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle'
  disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value = [],
  onChange,
  maxCount = 1,
  listType = 'picture-card',
  disabled = false,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  // 模拟上传到OSS
  const mockUploadToOSS = (file: FileType): Promise<string> => {
    return new Promise((resolve) => {
      // 模拟上传延迟
      setTimeout(() => {
        // 创建本地预览URL（在实际项目中这里会返回OSS的URL）
        const mockUrl = URL.createObjectURL(file as File)
        resolve(mockUrl)
      }, 1000)
    })
  }

  // 获取base64预览图
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file as File)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  // 文件列表转换
  const fileList: UploadFile[] = Array.isArray(value) ? value.map((url, index) => ({
    uid: `${index}`,
    name: `image-${index}.jpg`,
    status: 'done',
    url,
  })) : []

  // 预览处理
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  // 上传前检查
  const beforeUpload = (file: FileType) => {
    // 检查文件类型
    const isValidType = UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.includes(file.type as any)
    if (!isValidType) {
      message.error('只能上传 JPG/PNG/GIF/WebP 格式的图片！')
      return false
    }

    // 检查文件大小
    const isValidSize = file.size <= UPLOAD_CONFIG.MAX_FILE_SIZE
    if (!isValidSize) {
      message.error('图片大小不能超过 5MB！')
      return false
    }

    return true
  }

  // 自定义上传
  const handleCustomRequest = async (options: any) => {
    const { file, onSuccess, onError } = options

    try {
      // 模拟上传到OSS
      const url = await mockUploadToOSS(file)
      onSuccess({ url }, file)
    } catch (error) {
      console.error('Upload failed:', error)
      onError(error)
    }
  }

  // 上传状态变化
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // 过滤出成功上传的文件
    const successFiles = newFileList
      .filter(file => file.status === 'done')
      .map(file => file.response?.url || file.url)
      .filter(Boolean)

    onChange?.(successFiles)
  }

  // 移除文件
  const handleRemove = (file: UploadFile) => {
    const newValue = Array.isArray(value) ? value.filter(url => url !== file.url) : []
    onChange?.(newValue)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  return (
    <>
      <Upload
        customRequest={handleCustomRequest}
        listType={listType}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={beforeUpload}
        disabled={disabled}
        multiple={maxCount > 1}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default ImageUpload 