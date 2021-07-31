
export const buildImage = (src: string): Record<string, string> => {
    return {
        'url': src,
        'blob': '',
        'base64': `data:image/png;base64, ${src}`
    };
};
