import { Image as ImageProps } from "../../types/Image/types";
import { useCallback, useEffect, useState } from "react";

const normalizeSrc = (src?: string | Blob): string => {
    if (!src) return "";

    if (typeof src === "string") return src;

    return URL.createObjectURL(src);
};

export default function Image({
                                  src,
                                  placeholderImg,
                                  errorImg,
                                  ...props
                              }: ImageProps) {
    const [imgSrc, setSrc] = useState<string>(
        normalizeSrc(placeholderImg || src)
    );

    const onLoad = useCallback(() => {
        setSrc(normalizeSrc(src));
    }, [src]);

    const onError = useCallback(() => {
        setSrc(normalizeSrc(errorImg || placeholderImg));
    }, [errorImg, placeholderImg]);

    useEffect(() => {
        const image = new window.Image();

        const normalized = normalizeSrc(src);
        image.src = normalized;

        image.addEventListener("load", onLoad);
        image.addEventListener("error", onError);

        return () => {
            image.removeEventListener("load", onLoad);
            image.removeEventListener("error", onError);
        };
    }, [src, onLoad, onError]);

    return <img {...props} alt="" src={imgSrc} />;
}
