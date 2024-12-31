import { Model } from 'mongoose';
import UrlRepository from '../repositories/UrlRepository';
import ShortUniqueId from "short-unique-id";
import { IUrl } from '@/models/Url';
 export class UrlShortener{
    private UrlRepository;
    constructor(){
        this.UrlRepository=new UrlRepository();
    }
    async shortenUrl(originalUrl: string): Promise<IUrl | null> {
        try {
            // Check if the URL already exists
            let url = await this.UrlRepository.getUrlByOrginalUrl(originalUrl);
            console.log("Existing URL:", url); // Debug log

            if (url) {
                return url;
            }

            // Generate a unique short URL
            const shortid = new ShortUniqueId({ length: 6 });
            let shortUrl = shortid.rnd();

            // Ensure the short URL is unique
            url = await this.UrlRepository.getUrlByShortUrl(shortUrl);
            while (url) {
                shortUrl = shortid.rnd();
                url = await this.UrlRepository.getUrlByShortUrl(shortUrl);
            }

            // Create a new URL entry
            const newUrl = await this.UrlRepository.createUrl(originalUrl, shortUrl);
            console.log("Created URL:", newUrl); // Debug log

            return newUrl; // Return the short URL only
        } catch (error) {
            console.error("Error in shortenUrl:", error);
            throw new Error("Unable to shorten URL. Please try again later.");
        }
    }

      
    async getAllUrls():Promise<IUrl[]>{
        return await this.UrlRepository.getAllUrls();
    }
    async getUrlbyShortUrl(shortenUrl:string):Promise<string>{
        return await this.UrlRepository.getUrlByShortUrl(shortenUrl);
    }
}