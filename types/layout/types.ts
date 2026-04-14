import React from "react";

export interface Button{
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    classList?: string [];
    icon?: React.ElementType;
}

export interface Header{
    query?: string;

}

export interface Layout{
    children?: React.ReactNode;
}

