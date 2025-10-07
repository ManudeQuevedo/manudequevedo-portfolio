import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
interface WebpackConfig {
    resolve: {
        fallback: {
            fs: boolean;
            [key: string]: boolean;
        };
        [key: string]: any;
    };
    [key: string]: any;
}

interface NextConfigWithWebpack {
    webpack: (config: WebpackConfig) => WebpackConfig;
}

const nextConfig: NextConfigWithWebpack = {
    webpack: (config: WebpackConfig): WebpackConfig => {
        config.resolve.fallback = { fs: false };
        return config;
    },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);