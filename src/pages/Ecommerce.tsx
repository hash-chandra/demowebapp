import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  category: string
  description: string
}

interface CartItem extends Product {
  quantity: number
}

function Ecommerce() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [wishlist, setWishlist] = useState<number[]>([])

  const products: Product[] = [
    { id: 1, name: 'Laptop Pro 15', price: 1299.99, image: '💻', rating: 4.5, category: 'Electronics', description: 'High-performance laptop' },
    { id: 2, name: 'Wireless Mouse', price: 29.99, image: '🖱️', rating: 4.0, category: 'Accessories', description: 'Ergonomic wireless mouse' },
    { id: 3, name: 'Mechanical Keyboard', price: 89.99, image: '⌨️', rating: 4.8, category: 'Accessories', description: 'RGB mechanical keyboard' },
    { id: 4, name: 'USB-C Hub', price: 49.99, image: '🔌', rating: 4.3, category: 'Accessories', description: '7-in-1 USB hub' },
    { id: 5, name: 'Webcam HD', price: 79.99, image: '📷', rating: 4.2, category: 'Electronics', description: '1080p webcam' },
    { id: 6, name: 'Headphones', price: 149.99, image: '🎧', rating: 4.7, category: 'Audio', description: 'Noise-cancelling headphones' },
    { id: 7, name: 'Smartphone', price: 899.99, image: '📱', rating: 4.6, category: 'Electronics', description: 'Latest smartphone model' },
    { id: 8, name: 'Tablet', price: 599.99, image: '📱', rating: 4.4, category: 'Electronics', description: '10-inch tablet' },
  ]

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (rating: number) => void; interactive?: boolean }) => {
    const [hovered, setHovered] = useState(0)
    
    return (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            data-testid={`star-${star}`}
            onClick={() => interactive && onRate && onRate(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            style={{
              cursor: interactive ? 'pointer' : 'default',
              fontSize: '1.5rem',
              color: star <= (hovered || rating) ? '#ffc107' : '#ddd',
              transition: 'color 0.2s'
            }}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page">
      {/* Breadcrumb */}
      <nav id="breadcrumb" data-testid="breadcrumb" style={{ 
        padding: '0.75rem 0', 
        marginBottom: '1rem',
        fontSize: '0.9rem',
        color: '#7f8c8d'
      }}>
        <a href="#" style={{ color: '#3498db', textDecoration: 'none' }}>Home</a>
        {' > '}
        <span style={{ color: '#2c3e50' }}>E-commerce Demo</span>
      </nav>

      <h1>🛒 E-commerce Features</h1>
      <p>Practice automation with shopping cart, product grid, ratings, and more</p>

      {/* Search with Autocomplete */}
      <div className="form-group">
        <input
          type="text"
          id="product-search"
          data-testid="product-search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: '0.75rem',
            fontSize: '1rem',
            border: '2px solid #ddd',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '500px'
          }}
        />
        {searchTerm && (
          <div 
            id="search-suggestions" 
            data-testid="search-suggestions"
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginTop: '0.25rem',
              maxWidth: '500px',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {filteredProducts.slice(0, 5).map(product => (
              <div
                key={product.id}
                data-testid={`suggestion-${product.id}`}
                onClick={() => setSearchTerm(product.name)}
                style={{
                  padding: '0.75rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                {product.image} {product.name} - ${product.price}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shopping Cart Summary */}
      <div 
        id="cart-summary" 
        data-testid="cart-summary"
        style={{ 
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <span id="cart-count" data-testid="cart-count" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            🛒 Cart ({cartItemCount} items)
          </span>
        </div>
        <div>
          <span id="cart-total" data-testid="cart-total" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>
            ${cartTotal.toFixed(2)}
          </span>
          {cartItemCount > 0 && (
            <button
              id="checkout-button"
              data-testid="checkout-button"
              className="success"
              style={{ marginLeft: '1rem' }}
              onClick={() => alert(`Checkout total: $${cartTotal.toFixed(2)}`)}
            >
              Checkout
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <h2>Products</h2>
      <div 
        id="product-grid" 
        data-testid="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}
      >
        {filteredProducts.map(product => (
          <div
            key={product.id}
            id={`product-${product.id}`}
            data-testid={`product-${product.id}`}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: 'white',
              transition: 'box-shadow 0.3s',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            {/* Wishlist Heart */}
            <button
              id={`wishlist-${product.id}`}
              data-testid={`wishlist-${product.id}`}
              onClick={() => toggleWishlist(product.id)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: wishlist.includes(product.id) ? '#e74c3c' : '#ddd'
              }}
            >
              ♥
            </button>

            {/* Product Image */}
            <div style={{ fontSize: '5rem', textAlign: 'center', margin: '1rem 0' }}>
              {product.image}
            </div>

            {/* Product Info */}
            <h3 id={`product-name-${product.id}`} data-testid={`product-name-${product.id}`}>
              {product.name}
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {product.category}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.75rem' }}>
              {product.description}
            </p>

            {/* Rating */}
            <div style={{ marginBottom: '1rem' }}>
              <StarRating rating={product.rating} />
              <span style={{ marginLeft: '0.5rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
                ({product.rating})
              </span>
            </div>

            {/* Price and Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span 
                id={`product-price-${product.id}`}
                data-testid={`product-price-${product.id}`}
                style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}
              >
                ${product.price}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  id={`add-to-cart-${product.id}`}
                  data-testid={`add-to-cart-${product.id}`}
                  onClick={() => addToCart(product)}
                  className="btn-primary"
                >
                  Add to Cart
                </button>
                <button
                  id={`quick-view-${product.id}`}
                  data-testid={`quick-view-${product.id}`}
                  onClick={() => setSelectedProduct(product)}
                  className="secondary"
                >
                  👁️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      {cart.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2>Shopping Cart</h2>
          <div 
            id="cart-items" 
            data-testid="cart-items"
            style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}
          >
            {cart.map(item => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                data-testid={`cart-item-${item.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  borderBottom: '1px solid #ecf0f1',
                  gap: '1rem'
                }}
              >
                <div style={{ fontSize: '3rem' }}>{item.image}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>${item.price}</p>
                </div>

                {/* Quantity Selector */}
                <div 
                  id={`quantity-selector-${item.id}`}
                  data-testid={`quantity-selector-${item.id}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <button
                    id={`decrease-qty-${item.id}`}
                    data-testid={`decrease-qty-${item.id}`}
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid #ddd',
                      background: 'white',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '1.2rem'
                    }}
                  >
                    -
                  </button>
                  <span 
                    id={`quantity-${item.id}`}
                    data-testid={`quantity-${item.id}`}
                    style={{ minWidth: '40px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    id={`increase-qty-${item.id}`}
                    data-testid={`increase-qty-${item.id}`}
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid #ddd',
                      background: 'white',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '1.2rem'
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{ minWidth: '100px', textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  id={`remove-from-cart-${item.id}`}
                  data-testid={`remove-from-cart-${item.id}`}
                  onClick={() => removeFromCart(item.id)}
                  className="danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty Cart State */}
      {cart.length === 0 && (
        <div 
          id="empty-cart" 
          data-testid="empty-cart"
          style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}
        >
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛒</div>
          <h3>Your cart is empty</h3>
          <p style={{ color: '#7f8c8d' }}>Add some products to get started!</p>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <div 
          id="quick-view-modal"
          data-testid="quick-view-modal"
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px' }}
          >
            <h2>{selectedProduct.name}</h2>
            <div style={{ fontSize: '8rem', textAlign: 'center', margin: '2rem 0' }}>
              {selectedProduct.image}
            </div>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <div style={{ margin: '1rem 0' }}>
              <strong>Rating:</strong>
              <StarRating rating={selectedProduct.rating} />
            </div>
            <p style={{ fontSize: '2rem', color: '#27ae60', fontWeight: 'bold' }}>
              ${selectedProduct.price}
            </p>
            <div className="modal-actions">
              <button onClick={() => setSelectedProduct(null)} className="secondary">
                Close
              </button>
              <button
                onClick={() => {
                  addToCart(selectedProduct)
                  setSelectedProduct(null)
                }}
                className="success"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '2px solid #ecf0f1' }}>
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
          Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a>
        </p>
      </footer>
    </div>
  )
}

export default Ecommerce
