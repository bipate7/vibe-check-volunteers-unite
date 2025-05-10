
// Helper function to generate consistent placeholder images for volunteers
export const getVolunteerPlaceholder = (id: string, gender: 'man' | 'woman' = 'man'): string => {
  const seed = Number(id.replace(/\D/g, '')) % 10 || id.length;
  return `https://source.unsplash.com/random/300x300/?portrait,${gender},${seed}`;
};

// Helper function to generate consistent placeholder images for events
export const getEventPlaceholder = (id: string, keyword: string = ''): string => {
  const seed = Number(id.replace(/\D/g, '')) % 10 || id.length;
  const searchTerm = keyword ? keyword.toLowerCase() : 'volunteer';
  return `https://source.unsplash.com/random/800x600/?${searchTerm},${seed}`;
};

// Helper function to get initials from a name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

