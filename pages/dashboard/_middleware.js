import { NextResponse } from "next/server";

export async function middleware(req, ev) {
    // const {token = ''} = req.cookies

    // if (token === '') {
    //     return NextResponse.redirect(new URL('/', req.url))
    // }
    return NextResponse.next();
}