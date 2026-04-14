import type { NextConfig } from "next";
import withLess from "next-with-less";

const nextConfig: NextConfig = {
    reactStrictMode: true,
};

export default withLess(nextConfig);