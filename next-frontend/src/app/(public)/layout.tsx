import { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode; // Dynamic page content
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="">
        <main>

        {children} {/* This renders the page content dynamically */}

      </main>
    </div>
  );
};

export default PublicLayout;
