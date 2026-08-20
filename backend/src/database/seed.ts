import { db } from "../config/database";

const listings = [
  {
    title: "iPhone 13 128GB",
    category: "Mobile Phones",
    price: 450,
    condition: "Used",
    description:
      "iPhone 13 with 128GB storage. Battery health is 89%. Fully functional and in good condition.",
    image_url: "/images/iphone-13.jpg",
  },
  {
    title: "Samsung Galaxy S23",
    category: "Mobile Phones",
    price: 520,
    condition: "Used",
    description:
      "Samsung Galaxy S23 with 256GB storage. Excellent condition with no major scratches.",
    image_url: "/images/samsung-s23.jpg",
  },
  {
    title: "MacBook Air M2",
    category: "Laptops",
    price: 850,
    condition: "Used",
    description:
      "MacBook Air with M2 chip, 8GB RAM and 256GB SSD. Lightly used and works perfectly.",
    image_url: "/images/macbook-air-m2.jpg",
  },
  {
    title: "PlayStation 5 Console",
    category: "Gaming",
    price: 480,
    condition: "Used",
    description:
      "PlayStation 5 console with one controller. Includes power cable and HDMI cable.",
    image_url: "/images/playstation-5.jpg",
  },
  {
    title: "Leather Office Chair",
    category: "Furniture",
    price: 150,
    condition: "Good",
    description:
      "Comfortable leather office chair with adjustable height and armrests.",
    image_url: "/images/office-chair.jpg",
  },
  {
    title: "Wooden Study Desk",
    category: "Furniture",
    price: 120,
    condition: "Good",
    description:
      "Solid wooden study desk with two drawers. Suitable for a home office or study room.",
    image_url: "/images/study-desk.jpg",
  },
  {
    title: "Non-Stick Cookware Set",
    category: "Kitchen Items",
    price: 85,
    condition: "New",
    description:
      "Complete non-stick cookware set including frying pan, saucepans and cooking utensils.",
    image_url: "/images/cookware-set.jpg",
  },
  {
    title: "Nike Air Max Running Shoes",
    category: "Sports",
    price: 75,
    condition: "Good",
    description:
      "Nike Air Max running shoes, size 9 US. Comfortable and suitable for running and everyday use.",
    image_url: "/images/nike-air-max.jpg",
  },
];

const insertListing = db.prepare(`
  INSERT INTO listings (
    title,
    category,
    price,
    condition,
    description,
    image_url
  )
  VALUES (
    @title,
    @category,
    @price,
    @condition,
    @description,
    @image_url
  )
`);

const seed = db.transaction(() => {
  for (const listing of listings) {
    insertListing.run(listing);
  }
});

seed();

console.log(`${listings.length} listings seeded successfully.`);