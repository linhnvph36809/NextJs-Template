import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const handlerSetCookie = (name: string, value: any) => {
    setCookie(name, value);
}

export const handlerGetCookie = (name: string) => {
    return getCookie(name);
}

export const handlerDeleteCookie = (name: string) => {
    deleteCookie(name);
}