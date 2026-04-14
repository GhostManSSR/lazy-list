import React, { ImgHTMLAttributes, useEffect, useState } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    placeholderImg?: string;
    errorImg?: string;
};

const Image: React.FC<ImageProps> = ({
                                         src,
                                         placeholderImg,
                                         errorImg,
                                         ...props
                                     }) => {
    const [imgSrc, setImgSrc] = useState<string>(
        placeholderImg || (typeof src === "string" ? src : "")
    );

    useEffect(() => {
        if (typeof src !== "string" || !src) {
            setImgSrc(errorImg || placeholderImg || "");
            return;
        }

        const img = new window.Image();
        img.src = src;

        img.onload = () => {
            setImgSrc(src);
        };

        img.onerror = () => {
            setImgSrc(errorImg || placeholderImg || "");
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, errorImg, placeholderImg]);

    if (!imgSrc) return null;

    return <img {...props} src={imgSrc} alt={props.alt ?? ""} />;
};

export default Image;
