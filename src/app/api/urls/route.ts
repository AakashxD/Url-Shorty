import { NextResponse } from "next/server";
import  {UrlShortener}  from "@/services/urlShortenerService";
async function fetchUrls(){
    const urlshortener= new UrlShortener();
    const AllUrl = await urlshortener.getAllUrls();
    console.log(AllUrl);
    return AllUrl;
}
export async function GET(){
    const urls=await fetchUrls();
    const response= NextResponse.json({urls});
    response.headers.set('Cache-control','public , max-age=60 s-maxage=60 ,stale-while-revalidate=59')
    return response;
}