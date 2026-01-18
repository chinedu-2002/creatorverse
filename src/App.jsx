import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { supabase } from './client';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import './App.css';

function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching creators:', error);
          setError(error.message);
        } else {
          setCreators(data || []);
        }
      } catch (err) {
        console.error('Failed to connect to Supabase:', err);
        setError('Failed to connect to database. Please check your Supabase configuration.');
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: loading ? (
        <div className="loading">Loading creators...</div>
      ) : (
        <ShowCreators creators={creators} error={error} />
      )
    },
    {
      path: '/creator/:id',
      element: <ViewCreator />
    },
    {
      path: '/new',
      element: <AddCreator />
    },
    {
      path: '/edit/:id',
      element: <EditCreator />
    }
  ]);

  return (
    <main className="container">
      {routes}
    </main>
  );
}

export default App;
