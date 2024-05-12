"use server"

import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../utils';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    // console.log(response.data)
    const $ = cheerio.load(response.data);

    // Extract the product title
    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );
    // console.log("title",title,"currentPrice",currentPrice,"originalPrice",originalPrice) ✅
    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'
    // images are in this format {
    //   images: '{"https://m.media-amazon.com/images/I/51oMWaW7tKL._SX679_.jpg":[679,679],"https://m.media-amazon.com/images/I/51oMWaW7tKL._SX342_.jpg":[342,342],"https://m.media-amazon.com/images/I/51oMWaW7tKL._SX425_.jpg":[425,425],"https://m.media-amazon.com/images/I/51oMWaW7tKL._SX522_.jpg":[522,522],"https://m.media-amazon.com/images/I/51oMWaW7tKL._SX569_.jpg":[569,569],"https://m.media-amazon.com/images/I/51oMWaW7tKL._SX385_.jpg":[385,385],"https://m.media-amazon.com/images/I/51oMWaW7tKL._SX466_.jpg":[466,466]}'
    // } so we created an array of the keys of the json 
    const imageUrls = Object.keys(JSON.parse(images));
    // console.log({images})
    // console.log({imageUrls})
    const currency = extractCurrency($('.a-price-symbol'))
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

    const description = extractDescription($)

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }
    // console.log("Before sending to the front side ",data);
    
    return data;
  } catch (error: any) {
    console.log(error);
  }
}