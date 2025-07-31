import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNames: Record<string, string> = {
    dashboard: 'Dashboard',
    events: 'Events',
    volunteers: 'Volunteers',
    attendance: 'Attendance',
    new: 'New',
    edit: 'Edit',
  };

  const getBreadcrumbName = (pathname: string, index: number) => {
    // For dynamic routes like /volunteers/4, show "Details"
    if (index === pathnames.length - 1 && !isNaN(Number(pathname))) {
      return 'Details';
    }
    return breadcrumbNames[pathname] || pathname;
  };

  if (pathnames.length === 0 || location.pathname === '/') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      <Link
        to="/dashboard"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home size={16} />
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = getBreadcrumbName(pathname, index);

        return (
          <div key={pathname} className="flex items-center">
            <ChevronRight size={16} className="mx-1" />
            {isLast ? (
              <span className="font-medium text-foreground">{displayName}</span>
            ) : (
              <Link
                to={routeTo}
                className={cn(
                  "hover:text-foreground transition-colors",
                  "capitalize"
                )}
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;