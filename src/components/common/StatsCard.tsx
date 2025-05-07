
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'purple' | 'teal' | 'blue' | 'orange' | 'default';
};

const StatsCard = ({ title, value, icon, description, trend, variant = 'default' }: StatsCardProps) => {
  const getCardClasses = () => {
    switch (variant) {
      case 'purple':
        return 'card-gradient-purple';
      case 'teal':
        return 'card-gradient-teal';
      case 'blue':
        return 'card-gradient-blue';
      case 'orange':
        return 'card-gradient-orange';
      default:
        return '';
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'teal':
        return 'bg-teal-100 text-teal-600';
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <Card className={`hover-lift ${getCardClasses()}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`h-8 w-8 rounded-md flex items-center justify-center ${getIconClasses()}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend && (
              <span className={`inline-block mr-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
