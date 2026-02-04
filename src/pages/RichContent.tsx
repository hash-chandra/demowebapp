import { useState, useRef, useEffect } from 'react'

function RichContent() {
  const [editorContent, setEditorContent] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Keyboard shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        alert('Save shortcut triggered (Cmd/Ctrl+S)')
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault()
        document.execCommand('bold')
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault()
        document.execCommand('italic')
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
        e.preventDefault()
        document.execCommand('underline')
      }
    }

    const handleClickOutside = () => setContextMenu(null)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreviewUrl('')
      }
    }
  }

  const simulateUpload = () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleEditorInput = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML)
    }
  }

  return (
    <div className="page">
      <h1>✨ Rich Content Features</h1>
      <p>Practice automation with rich text editing, file uploads, and advanced interactions</p>

      {/* Rich Text Editor */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📝 Rich Text Editor</h2>
        <p>Test contentEditable, text formatting, and editor controls</p>
        
        {/* Toolbar */}
        <div 
          id="editor-toolbar" 
          data-testid="editor-toolbar"
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.75rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px 8px 0 0',
            border: '1px solid #ddd',
            borderBottom: 'none',
            flexWrap: 'wrap'
          }}
        >
          <button
            id="format-bold"
            data-testid="format-bold"
            onClick={() => applyFormat('bold')}
            style={{ padding: '0.5rem 0.75rem', fontWeight: 'bold' }}
            title="Bold (Cmd/Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            id="format-italic"
            data-testid="format-italic"
            onClick={() => applyFormat('italic')}
            style={{ padding: '0.5rem 0.75rem', fontStyle: 'italic' }}
            title="Italic (Cmd/Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            id="format-underline"
            data-testid="format-underline"
            onClick={() => applyFormat('underline')}
            style={{ padding: '0.5rem 0.75rem', textDecoration: 'underline' }}
            title="Underline (Cmd/Ctrl+U)"
          >
            U
          </button>
          <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 0.25rem' }} />
          <button
            id="format-h1"
            data-testid="format-h1"
            onClick={() => applyFormat('formatBlock', 'h1')}
            style={{ padding: '0.5rem 0.75rem' }}
          >
            H1
          </button>
          <button
            id="format-h2"
            data-testid="format-h2"
            onClick={() => applyFormat('formatBlock', 'h2')}
            style={{ padding: '0.5rem 0.75rem' }}
          >
            H2
          </button>
          <button
            id="format-p"
            data-testid="format-p"
            onClick={() => applyFormat('formatBlock', 'p')}
            style={{ padding: '0.5rem 0.75rem' }}
          >
            P
          </button>
          <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 0.25rem' }} />
          <button
            id="format-ul"
            data-testid="format-ul"
            onClick={() => applyFormat('insertUnorderedList')}
            style={{ padding: '0.5rem 0.75rem' }}
          >
            • List
          </button>
          <button
            id="format-ol"
            data-testid="format-ol"
            onClick={() => applyFormat('insertOrderedList')}
            style={{ padding: '0.5rem 0.75rem' }}
          >
            1. List
          </button>
          <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 0.25rem' }} />
          <button
            id="format-undo"
            data-testid="format-undo"
            onClick={() => applyFormat('undo')}
            style={{ padding: '0.5rem 0.75rem' }}
          >
            ↶ Undo
          </button>
          <button
            id="format-redo"
            data-testid="format-redo"
            onClick={() => applyFormat('redo')}
            style={{ padding: '0.5rem 0.75rem' }}
          >
            ↷ Redo
          </button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          id="rich-text-editor"
          data-testid="rich-text-editor"
          contentEditable
          onInput={handleEditorInput}
          style={{
            minHeight: '300px',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '0 0 8px 8px',
            backgroundColor: 'white',
            outline: 'none',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}
        />

        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
          Keyboard shortcuts: <strong>Cmd/Ctrl+S</strong> Save, <strong>Cmd/Ctrl+B</strong> Bold, 
          <strong> Cmd/Ctrl+I</strong> Italic, <strong>Cmd/Ctrl+U</strong> Underline
        </div>

        {/* HTML Output */}
        {editorContent && (
          <div style={{ marginTop: '1rem' }}>
            <h4>Generated HTML:</h4>
            <pre 
              id="editor-html" 
              data-testid="editor-html"
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                fontSize: '0.85rem',
                overflow: 'auto',
                maxHeight: '200px'
              }}
            >
              {editorContent}
            </pre>
          </div>
        )}
      </section>

      {/* File Upload with Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📁 File Upload with Preview</h2>
        <p>Test file selection, validation, preview, and upload simulation</p>
        
        <input
          ref={fileInputRef}
          type="file"
          id="file-input"
          data-testid="file-input"
          onChange={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx,.txt"
          style={{ display: 'none' }}
        />

        <button
          id="file-select-button"
          data-testid="file-select-button"
          onClick={() => fileInputRef.current?.click()}
          className="btn-primary"
        >
          📎 Select File
        </button>

        {selectedFile && (
          <div 
            id="file-preview" 
            data-testid="file-preview"
            style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              border: '2px dashed #ddd',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <strong>Selected File:</strong>
              <div id="file-name" data-testid="file-name" style={{ marginTop: '0.5rem' }}>
                📄 {selectedFile.name}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                Size: {(selectedFile.size / 1024).toFixed(2)} KB | Type: {selectedFile.type || 'unknown'}
              </div>
            </div>

            {previewUrl && (
              <div id="image-preview" data-testid="image-preview" style={{ marginBottom: '1rem' }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                id="upload-button"
                data-testid="upload-button"
                onClick={simulateUpload}
                disabled={isUploading || uploadProgress === 100}
                className="success"
              >
                {uploadProgress === 100 ? '✓ Uploaded' : isUploading ? 'Uploading...' : '⬆️ Upload'}
              </button>
              <button
                id="cancel-upload"
                data-testid="cancel-upload"
                onClick={() => {
                  setSelectedFile(null)
                  setPreviewUrl('')
                  setUploadProgress(0)
                  setIsUploading(false)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className="danger"
              >
                ✕ Cancel
              </button>
            </div>

            {(isUploading || uploadProgress > 0) && (
              <div 
                id="upload-progress" 
                data-testid="upload-progress"
                style={{ marginTop: '1rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Upload Progress</span>
                  <span style={{ fontWeight: 'bold' }}>{uploadProgress}%</span>
                </div>
                <div style={{
                  height: '8px',
                  backgroundColor: '#ecf0f1',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${uploadProgress}%`,
                      backgroundColor: '#27ae60',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Context Menu */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📋 Context Menu</h2>
        <p>Test right-click custom context menus</p>
        
        <div
          id="context-menu-area"
          data-testid="context-menu-area"
          onContextMenu={handleContextMenu}
          style={{
            padding: '3rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px dashed #ddd',
            cursor: 'context-menu'
          }}
        >
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Right-click here to see custom menu</p>
          <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Try right-clicking anywhere in this box</p>
        </div>

        {contextMenu && (
          <div
            id="custom-context-menu"
            data-testid="custom-context-menu"
            style={{
              position: 'fixed',
              top: contextMenu.y,
              left: contextMenu.x,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              minWidth: '200px',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {['Copy', 'Paste', 'Cut', 'Delete', 'Select All', 'Properties'].map((item, index) => (
              <button
                key={item}
                id={`context-menu-${item.toLowerCase().replace(' ', '-')}`}
                data-testid={`context-menu-${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => {
                  alert(`${item} clicked`)
                  setContextMenu(null)
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: 'none',
                  backgroundColor: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  borderTop: index === 0 ? 'none' : '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Keyboard Shortcuts Reference */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>⌨️ Keyboard Shortcuts</h2>
        <p>Test keyboard event handling and shortcuts</p>
        
        <div 
          id="shortcuts-list" 
          data-testid="shortcuts-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}
        >
          {[
            { keys: 'Cmd/Ctrl + S', action: 'Save document' },
            { keys: 'Cmd/Ctrl + B', action: 'Bold text' },
            { keys: 'Cmd/Ctrl + I', action: 'Italic text' },
            { keys: 'Cmd/Ctrl + U', action: 'Underline text' },
            { keys: 'Cmd/Ctrl + Z', action: 'Undo' },
            { keys: 'Cmd/Ctrl + Y', action: 'Redo' }
          ].map(shortcut => (
            <div
              key={shortcut.keys}
              data-testid={`shortcut-${shortcut.keys.replace(/[^a-z]/gi, '')}`}
              style={{
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              <div style={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#3498db'
              }}>
                {shortcut.keys}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                {shortcut.action}
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '2px solid #ecf0f1' }}>
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
          Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a>
        </p>
      </footer>    </div>
  )
}

export default RichContent
