import { useState } from 'react'

interface Item {
  id: string
  content: string
}

function DragDrop() {
  const [sourceItems, setSourceItems] = useState<Item[]>([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
  ])
  const [targetItems, setTargetItems] = useState<Item[]>([])
  const [draggedItem, setDraggedItem] = useState<Item | null>(null)

  const handleDragStart = (e: React.DragEvent, item: Item, source: 'source' | 'target') => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML)
    e.dataTransfer.setData('source', source)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, destination: 'source' | 'target') => {
    e.preventDefault()
    if (!draggedItem) return

    const source = e.dataTransfer.getData('source')
    
    if (source === destination) {
      setDraggedItem(null)
      return
    }

    if (source === 'source' && destination === 'target') {
      setSourceItems(sourceItems.filter(item => item.id !== draggedItem.id))
      setTargetItems([...targetItems, draggedItem])
    } else if (source === 'target' && destination === 'source') {
      setTargetItems(targetItems.filter(item => item.id !== draggedItem.id))
      setSourceItems([...sourceItems, draggedItem])
    }

    setDraggedItem(null)
  }

  const resetItems = () => {
    setSourceItems([
      { id: '1', content: 'Item 1' },
      { id: '2', content: 'Item 2' },
      { id: '3', content: 'Item 3' },
      { id: '4', content: 'Item 4' },
      { id: '5', content: 'Item 5' },
    ])
    setTargetItems([])
  }

  return (
    <div className="page">
      <h1>Drag & Drop</h1>
      <p>Practice drag and drop interactions</p>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        {/* Source Box */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h2>Source</h2>
          <div
            id="source-box"
            data-testid="source-box"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'source')}
            style={{
              minHeight: '300px',
              border: '2px dashed #3498db',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#ecf0f1'
            }}
          >
            {sourceItems.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Drop items here</p>
            ) : (
              sourceItems.map((item) => (
                <div
                  key={item.id}
                  id={`source-item-${item.id}`}
                  data-testid={`source-item-${item.id}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, 'source')}
                  style={{
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'move',
                    userSelect: 'none'
                  }}
                >
                  {item.content}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Target Box */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h2>Target</h2>
          <div
            id="target-box"
            data-testid="target-box"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'target')}
            style={{
              minHeight: '300px',
              border: '2px dashed #27ae60',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#ecf0f1'
            }}
          >
            {targetItems.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Drop items here</p>
            ) : (
              targetItems.map((item) => (
                <div
                  key={item.id}
                  id={`target-item-${item.id}`}
                  data-testid={`target-item-${item.id}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, 'target')}
                  style={{
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'move',
                    userSelect: 'none'
                  }}
                >
                  {item.content}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
          id="reset-drag-drop"
          data-testid="reset-drag-drop"
          className="secondary"
          onClick={resetItems}
        >
          Reset
        </button>
      </div>

      <div style={{ marginTop: '2rem', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
        <h3>Instructions:</h3>
        <ul>
          <li>Drag items from the Source box to the Target box</li>
          <li>You can also drag items back from Target to Source</li>
          <li>Each item has a unique ID for easy identification</li>
          <li>Use the Reset button to restore all items to the Source box</li>
        </ul>

        <h3 style={{ marginTop: '1.5rem' }}>Automation Tips:</h3>
        <p>Use drag and drop actions in your automation framework:</p>
        <pre style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Playwright
await page.dragAndDrop('#source-item-1', '#target-box');

// Selenium
Actions actions = new Actions(driver);
WebElement source = driver.findElement(By.id("source-item-1"));
WebElement target = driver.findElement(By.id("target-box"));
actions.dragAndDrop(source, target).perform();`}
        </pre>
      </div>
      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #ecf0f1', textAlign: 'center', color: '#7f8c8d' }}>
        <p>
          Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a>
        </p>
      </footer>
    </div>
  )
}

export default DragDrop
