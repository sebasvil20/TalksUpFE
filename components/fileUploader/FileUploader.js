import { Dropzone, FileItem } from '@dropzone-ui/react'

export const FileUploader = ({ files, setFiles }) => {
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id))
  }

  return (
    <Dropzone
      style={{ minWidth: '100%' }}
      onChange={(incommingFiles) => setFiles(incommingFiles)}
      value={files}
      maxFiles={1}
      accept='.png,.jpeg,.jpg,.webp'
      label='Arrastra tu imagen aqui'
      behaviour='replace'
      footer={false}
    >
      {files.map((file) => (
        <FileItem {...file} onDelete={removeFile} key={file.id} info />
      ))}
    </Dropzone>
  )
}
