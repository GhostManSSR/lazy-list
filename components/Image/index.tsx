import React, { ImgHTMLAttributes, useEffect, useState } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    placeholderImg?: string;
    errorImg?: string;
};

const DEFAULT_PLACEHOLDER = "https://placehold.co/600x400?text=No+Image";

const Image: React.FC<ImageProps> = ({
                                         src,
                                         placeholderImg,
                                         errorImg,
                                         ...props
                                     }) => {
    const [imgSrc, setImgSrc] = useState<string>(
        placeholderImg || (typeof src === "string" ? src : DEFAULT_PLACEHOLDER)
    );

    useEffect(() => {
        if (typeof src !== "string" || !src) {
            setImgSrc(errorImg || placeholderImg || DEFAULT_PLACEHOLDER);
            return;
        }

        const img = new window.Image();
        img.src = src;

        img.onload = () => {
            setImgSrc(src);
        };

        img.onerror = () => {
            setImgSrc(errorImg || placeholderImg || DEFAULT_PLACEHOLDER);
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, errorImg, placeholderImg]);

    return (
        <img
            {...props}
            src={imgSrc}
            alt={props.alt ?? ""}
        />
    );
};

export default Image;
