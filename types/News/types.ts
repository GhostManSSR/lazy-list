
export interface NewsImageSizes {
    hd: string;
    l: string;
    m: string;
    s: string;
}

export type FetchNewsResponse = {
    news: News[];
    minDatePublication: string;
    totalPages: number;
};

export interface NewsCover {
    type: "gallery" | string;
    images: NewsImageSizes[];
}

export type Derection = {
     id: number;
     name: string;
     slug: string;
}

export interface News {
    id: string;

    title: string;

    cover: NewsCover;

    rubrics: Rubric[];

    directions: Derection;

    isBreaking: boolean;
    isImportant: boolean;

    isLiked: boolean;
    likeCount: number;

    viewCount: number;
    viewed: boolean;

    needConfirmation: boolean;

    publishedAt: string;
}

export type Rubric = {
    id: number;
    name: string;
    slug: string;
}

export interface ListNews{
    news: News[],
    key: string
}