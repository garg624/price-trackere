import { ProductInterFace } from '@/components/CardWrapper';
import { User, EmailContent } from './../types/index';
"use server"

import { connect } from "@/dbconfig/db";
import Product from "@/models/product.model";
import { generateEmailBody, sendEmail } from '@/nodemailer';
import { scrapeAmazonProduct } from "@/scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "@/utils";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function scrapAndStoreProduct(producturl: string) {
  
    if (!producturl) return;

    try {
        connect();
        const scrapedproduct = await scrapeAmazonProduct(producturl);
        if (!scrapedproduct) return;
        let product = scrapedproduct;
        const existingProduct: any = await Product.findOne({ url: scrapedproduct.url })
        if (existingProduct) {
            // update the pricehistory
            const updatedpriceHistory: any = [...existingProduct.priceHistory, { price: scrapedproduct.currentPrice }];
            product = {
                ...scrapedproduct,
                priceHistory: updatedpriceHistory,
                lowestPrice: getLowestPrice(updatedpriceHistory),
                highestPrice: getHighestPrice(updatedpriceHistory),
                averagePrice: getAveragePrice(updatedpriceHistory),
            }
        }
        const newProduct: any = await Product.findOneAndUpdate(
            { url: scrapedproduct.url },
            product,
            {   //  This option returns the updated document rather than the original document.
                new: true,
                //This option inserts a new document if no existing document is found based on the query filter.
                upsert: true,
                setDefaultsOnInsert: true,
            }
        )
        const productId = newProduct._id.toString() || " ";
        revalidatePath(`product/${newProduct._id}`);
        return {
            sucess: true,
            productId
        }
    } catch (error: any) {
        // throw new Error("Error while scraping the data 500", error.message)
        return {
            success: false,
            error: error as Error
        };
    }
}
export async function getProductById(productId: string) {
    if (!productId) {
        return null;
    }
    if (!mongoose.isValidObjectId(productId)) {
        return null;
    }
    try {
        connect();
        const product = await Product.findById(productId);
        if (!product) return null;
        return product;
    } catch (error: any) {
        return null;
    }

}



export async function getAllProducts() {
    
    try {
        connect();
        const products:any[] = await Product.find()
        .select("_id createAt image title category lowestPrice currency")
        .sort({ createdAt: -1 });
        console.log(products)
        // products._id=products._id.toString() || " "
        return products;
    } catch (error) {
        console.log(error)
    }
}


export async function addUserEmailToProduct(productId:string,emailId:string){
    try {
        connect();
        // console.log("productid",productId,"emailid",emailId)
        const product = await Product.findById(productId);
        // console.log("from server action ",product)
        if (!product) return null;
        // check if email is alread there
        const userExisted = product.users.some((user: User) => user.email === emailId);
        
        if(!userExisted){
            // console.log("new email ",product)
            product.users.push({email:emailId});
            await product.save();
            // in the generate body function we have a swaitch case which will create a email body and subject based on our case WELCOME then return an object with them and we call the send email function which is using the nodemailer to send the email to the product users.
            const emailContent=await generateEmailBody(product,"WELCOME");
            // console.log("email content for welcome",emailContent)

            await sendEmail(emailContent,[emailId]);
        }
      
       
    } catch (error) {
        console.log(error)
    }
}