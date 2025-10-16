import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}