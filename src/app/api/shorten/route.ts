import { NextResponse } from "next/server";
import  {UrlShortener}  from "@/services/urlShortenerService";
export async function POST(req:Request){
    const {originalUrl} = await req.json();
    const urlShortener=new UrlShortener();
    const shortUrl = await urlShortener.shortenUrl(originalUrl);
    console.log(shortUrl,"shommetoeoefdmkfmd")
    return NextResponse.json({ originalUrl, shortUrl: shortUrl.shortUrl });

}