const API_ROOT = "";

type HeadersType = Record<string, string>;

interface RequestParams {
    headers?: HeadersType;
}

export const getImageUrl = (path?: string) => {
    if (!path) return "";

    if (path.startsWith("http")) return path;

    return `http://1e14c3489fcb.vps.myjino.ru:5000${path}`;
};

export const getTokenAccess = (): string => {
    if (typeof window === "undefined") return "";

    const token = localStorage.getItem("token");
    if (!token || token === "undefined") return "";

    try {
        return JSON.parse(token).access || "";
    } catch {
        return "";
    }
};

class HttpProvider {
    static async get<T = any>(url: string, params: RequestParams = {}): Promise<T> {
        const headers: HeadersType = {
            Authorization: params.headers?.Authorization ?? getTokenAccess(),
        };

        const response = await fetch(`${API_ROOT}${url}`, { headers });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }

    private static async _send<T = any>(
        url: string,
        method: "POST" | "PUT" | "DELETE" = "POST",
        data: unknown = {},
        headers: HeadersType = {}
    ): Promise<T | void> {
        const response = await fetch(`${API_ROOT}${url}`, {
            method,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                ...headers,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(new Error(response.statusText));
        }

        if (method !== "DELETE") {
            return response.json();
        }
    }

    static sendFormData<T = any>(url: string, formData: FormData): Promise<T> {
        return fetch(`${API_ROOT}${url}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: getTokenAccess(),
            },
        }).then((response) => {
            if (!response.ok) {
                console.error(new Error(response.statusText));
            }

            return response.json();
        });
    }

    static post<T = any>(url: string, data: unknown = {}): Promise<T | void> {
        return this._send<T>(url, "POST", data);
    }

    static put<T = any>(url: string, data: unknown = {}): Promise<T | void> {
        return this._send<T>(url, "PUT", data);
    }

    static del(url: string, data: unknown = {}): Promise<void> {
        return this._send<void>(url, "DELETE", data, {
            Authorization: getTokenAccess(),
        });
    }

    static auth<T = any>(url: string): Promise<T> {
        return this.get<T>(url, {
            headers: { Authorization: getTokenAccess() },
        });
    }

    static auth_post<T = any>(url: string, data: unknown): Promise<T | void> {
        return this._send<T>(url, "POST", data, {
            Authorization: getTokenAccess(),
        });
    }
}

export default HttpProvider;
