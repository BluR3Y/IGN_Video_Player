
const deviceSizes = {
    minMobile: '320px',
    minTablet: '481px',
    minLaptop: '769px',
    minDesktop: '1025px',
};

export const breakPoints = {
    mobile: `(min-width: ${deviceSizes.minMobile})`,
    tablet: `(min-width: ${deviceSizes.minTablet})`,
    laptop: `(min-width: ${deviceSizes.minLaptop})`,
    desktop: `(min-width: ${deviceSizes.minDesktop})`,
};