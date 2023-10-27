import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;

    // Change current page to new title
    document.title = 'NC News | ' + title;

    return () => (document.title = previousTitle);
  }, [title]);
  return <div>useTitle</div>;
};
export default useTitle;
