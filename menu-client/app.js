const { useState, useEffect } = React;

const API_URL = 'http://localhost:4000/graphql';

const MenuItem = ({ item }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="flex justify-between items-start">
      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
      <span className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</span>
    </div>
    <p className="text-gray-600 mt-2">{item.description}</p>
    {item.tags.length > 0 && (
      <div className="mt-2">
        {item.tags.map(tag => (
          <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

const CategorySection = ({ category, items }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.name}</h2>
    <div className="space-y-4">
      {items.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  </div>
);

const MenuApp = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          query {
            categories {
              id
              name
            }
            menuItems {
              id
              name
              description
              price
              isAvailable
              category {
                id
              }
              tags
            }
          }
        `;

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // TODO: Add API key header if needed in the future
            // 'x-api-key': API_KEY,
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        setCategories(data.data.categories);
        setMenuItems(data.data.menuItems);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-bold text-center text-gray-900 mb-12">Our Menu</h1>
        {categories.map(category => (
          <CategorySection
            key={category.id}
            category={category}
            items={menuItems.filter(item => item.category.id === category.id && item.isAvailable)}
          />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<MenuApp />, document.getElementById('root')); 