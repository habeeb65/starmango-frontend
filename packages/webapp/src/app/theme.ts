import { extendTheme } from '@chakra-ui/react';

/**
 * Custom theme configuration for Chakra UI
 */
export const theme = extendTheme({
  colors: {
    brand: {
      50: '#F0FAFF',
      100: '#DAF1FF',
      200: '#B5E5FF',
      300: '#83D3FF',
      400: '#5AB9FA',
      500: '#2F96F3',
      600: '#207AE1',
      700: '#1560C2',
      800: '#0F499B',
      900: '#0B3373',
    },
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
  },
});