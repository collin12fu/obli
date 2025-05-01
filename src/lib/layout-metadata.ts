// Define a mapping for layout-specific settings based on the route path
const layoutSettings: Record<string, { hideHeader?: boolean }> = {
    "/auth": { hideHeader: true },
    // "/onboarding": { hideHeader: true }, // Uncomment and modify if needed
  };
  
  // Function to fetch the layout metadata based on the current pathname
  export async function getLayoutMetadata(pathname: string) {
    // Iterate through the layout settings to match the pathname
    for (const path in layoutSettings) {
      if (pathname.startsWith(path)) {
        return layoutSettings[path]; // Return the settings for matched route
      }
    }
  
    // Return default settings if no match is found
    return { hideHeader: false };
  }