import { NextResponse } from "next/server";
import  {UrlShortener}  from "@/services/urlShortenerService";
export async function GET(){
    const urlshortener= new UrlShortener();
    const AllUrl = await urlshortener.getAllUrls();
    return NextResponse.json({AllUrl});
}