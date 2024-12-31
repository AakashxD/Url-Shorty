import { Model } from "mongoose";
import Url, { IUrl } from "@/models/Url";
import connectDB from "@/config/db";

export  class UrlRepository {
  private urlModel: Model<IUrl>;

  constructor() {
    connectDB(); // Ensure the database connection
    this.urlModel = Url; // Assign the Mongoose model
  }

  async getUrlById(id: string): Promise<IUrl | null> {
    try {
      return await this.urlModel.findById(id).lean();
    } catch (error) {
      console.error(`Error fetching URL by ID: ${id}`, error);
      return null;
    }
  }

  async getUrlByShortUrl(shortUrl: string): Promise<IUrl | null> {
    try {
      return await this.urlModel.findOne({ shortUrl }).lean();
    } catch (error) {
      console.error(`Error fetching URL by shortUrl: ${shortUrl}`, error);
      return null;
    }
  }

  async getUrlByOrginalUrl(originalUrl: string): Promise<IUrl | null> {
    try {
      return await this.urlModel.findOne({ originalUrl }).lean();
    } catch (error) {
      console.error(`Error fetching URL by originalUrl: ${originalUrl}`, error);
      return null;
    }
  }

  async getAllUrls(): Promise<IUrl[]> {
    try {
      return await this.urlModel.find().lean();
    } catch (error) {
      console.error("Error fetching all URLs", error);
      return [];
    }
  }

  async deleteUrl(id: string): Promise<boolean> {
    try {
      const result = await this.urlModel.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error(`Error deleting URL with ID: ${id}`, error);
      return false;
    }
  }

  async createUrl(originalUrl: string, shortUrl: string): Promise<IUrl | null> {
    try {
      return await this.urlModel.create({
        shortUrl,
        originalUrl,
      });
    } catch (error) {
      console.error("Error creating URL", error);
      return null;
    }
  }

  // Future methods for updating records can be added here
}

export default UrlRepository;
