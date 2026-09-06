import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, MapPin, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { Loader } from '@/components/common/Loader';
import { useMode } from '@/hooks/useMode';
import { Product } from '@/types';
import { listingService } from '@/services/listing.service';
import { formatPrice, formatDistance } from '@/utils/helpers';

export const BuyPage: React.FC = () => {
  const { mode } = useMode();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState('newest');

  const categories = mode === 'rural' 
    ? ['all', 'agriculture', 'handicrafts', 'livestock', 'tools']
    : ['all', 'electronics', 'furniture', 'clothing', 'books', 'sports'];

  useEffect(() => { loadProducts(); }, [mode, selectedCategory, sortBy]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const productData = await listingService.getProducts({ mode, category: selectedCategory !== 'all' ? selectedCategory : undefined, query: searchQuery || undefined, minPrice: priceRange[0], maxPrice: priceRange[1] });
      setProducts(productData);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => loadProducts();

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <GlassCard className="overflow-hidden hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col h-full bg-white border border-gray-200">
      <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
        <img src={product.images[0] || '/api/placeholder/300/200'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
        <div className="absolute top-3 left-3">
          <Badge variant={product.mode === 'rural' ? 'rural' : 'urban'}>{product.condition}</Badge>
        </div>
      </div>
      <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">{product.title}</h3>
          <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
        </div>
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <MapPin className="h-4 w-4" /><span>{formatDistance(2.1)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 text-xs font-bold">{product.seller.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="text-gray-500 text-xs">{product.seller.rating.toFixed(1)}</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700">Qty: {product.quantity}</Badge>
          </div>
          <Button variant={product.mode === 'rural' ? 'rural' : 'urban'} className="w-full" size="sm">Contact Seller</Button>
        </div>
      </div>
    </GlassCard>
  );

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{mode === 'rural' ? 'Rural' : 'Urban'} Marketplace</h1>
            <p className="text-gray-500 mt-1">Discover amazing products from your community</p>
          </div>
          <div className="flex items-center space-x-2 bg-white p-1 rounded-md border border-gray-200 shadow-sm">
            <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="icon" className={`h-8 w-8 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`} onClick={() => setViewMode('grid')}><Grid className="h-4 w-4" /></Button>
            <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="icon" className={`h-8 w-8 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`} onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
          </div>
        </div>

        <GlassCard className="p-4 bg-white shadow-sm border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-10" onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm">
              {categories.map((category) => <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm">
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
            <Button variant="outline" onClick={handleSearch} className="text-gray-700 bg-white border-gray-300 hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" /> Apply
            </Button>
          </div>
        </GlassCard>

        {isLoading ? (
          <Loader text="Loading products..." />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try adjusting your search criteria or be the first to list in this category!"
            action={{ label: "List a Product", onClick: () => window.location.href = '/sell' }}
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 font-medium">{products.length} products found</p>
              <Badge variant="outline" className="bg-white text-gray-700 border-gray-200 capitalize">{mode} Mode</Badge>
            </div>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};