import { db } from "../config/database";
import bcrypt from "bcrypt";

const listings = [
  // Mobile Phones
  {
    title: "iPhone 13 128GB",
    category: "Mobile Phones",
    price: 145000,
    condition: "Used",
    description:
      "iPhone 13 with 128GB storage. Battery health is 89%. Fully functional and in New condition.",
    image_url: "/images/iphone-13.jpg",
  },
  {
    title: "Samsung Galaxy S23",
    category: "Mobile Phones",
    price: 155000,
    condition: "Used",
    description:
      "Samsung Galaxy S23 with 256GB storage. Excellent condition with no major scratches.",
    image_url: "/images/samsung-s23.jpg",
  },
  {
    title: "Google Pixel 8",
    category: "Mobile Phones",
    price: 135000,
    condition: "New",
    description:
      "Google Pixel 8 with 128GB storage and excellent camera quality.",
    image_url: "/images/google-pixel-8.jpg",
  },
  {
    title: "OnePlus 12",
    category: "Mobile Phones",
    price: 175000,
    condition: "New",
    description:
      "OnePlus 12 with 256GB storage and 12GB RAM. Fast performance and excellent display.",
    image_url: "/images/oneplus-12.jpg",
  },

  // Laptops
  {
    title: "MacBook Air M2",
    category: "Laptops",
    price: 285000,
    condition: "Used",
    description:
      "MacBook Air with M2 chip, 8GB RAM and 256GB SSD. Lightly used and works perfectly.",
    image_url: "/images/macbook-air-m2.jpg",
  },
  {
    title: "Dell XPS 13",
    category: "Laptops",
    price: 265000,
    condition: "New",
    description:
      "Dell XPS 13 with Intel Core i7, 16GB RAM and 512GB SSD.",
    image_url: "/images/dell-xps-13.jpg",
  },
  {
    title: "Lenovo ThinkPad T14",
    category: "Laptops",
    price: 195000,
    condition: "Used",
    description:
      "Lenovo ThinkPad T14 with Intel Core i5, 16GB RAM and 512GB SSD.",
    image_url: "/images/thinkpad-t14.jpg",
  },
  {
    title: "ASUS ROG Gaming Laptop",
    category: "Laptops",
    price: 365000,
    condition: "New",
    description:
      "ASUS ROG gaming laptop with dedicated graphics, 16GB RAM and 1TB SSD.",
    image_url: "/images/asus-rog.jpg",
  },

  // Furniture
  {
    title: "Leather Office Chair",
    category: "Furniture",
    price: 45000,
    condition: "New",
    description:
      "Comfortable leather office chair with adjustable height and armrests.",
    image_url: "/images/office-chair.jpg",
  },
  {
    title: "Wooden Study Desk",
    category: "Furniture",
    price: 38000,
    condition: "New",
    description:
      "Solid wooden study desk with two drawers. Suitable for a home office or study room.",
    image_url: "/images/study-desk.jpg",
  },
  {
    title: "Three-Seater Sofa",
    category: "Furniture",
    price: 95000,
    condition: "Used",
    description:
      "Comfortable three-seater fabric sofa. Well maintained with minimal signs of use.",
    image_url: "/images/three-seater-sofa.jpg",
  },

  // Kitchen items
  {
    title: "Non-Stick Cookware Set",
    category: "Kitchen items",
    price: 28000,
    condition: "New",
    description:
      "Complete non-stick cookware set including frying pan, saucepans and cooking utensils.",
    image_url: "/images/cookware-set.jpg",
  },
  {
    title: "Electric Rice Cooker",
    category: "Kitchen items",
    price: 18000,
    condition: "New",
    description:
      "Electric rice cooker with automatic cooking and warming functions.",
    image_url: "/images/rice-cooker.jpg",
  },
  {
    title: "Microwave Oven",
    category: "Kitchen items",
    price: 42000,
    condition: "Used",
    description:
      "Compact microwave oven with multiple cooking settings. Clean and fully functional.",
    image_url: "/images/microwave.jpg",
  },

  // Sports
  {
    title: "Nike Air Max Running Shoes",
    category: "Sports",
    price: 24000,
    condition: "New",
    description:
      "Nike Air Max running shoes, size 9 US. Comfortable for running and everyday use.",
    image_url: "/images/nike-air-max.jpg",
  },
  {
    title: "Mountain Bicycle",
    category: "Sports",
    price: 125000,
    condition: "Used",
    description:
      "Mountain bicycle with 21-speed gears. Well maintained and suitable for daily riding.",
    image_url: "/images/mountain-bike.jpg",
  },
  {
    title: "Adjustable Dumbbell Set",
    category: "Sports",
    price: 32000,
    condition: "New",
    description:
      "Adjustable dumbbell set suitable for home workouts and strength training.",
    image_url: "/images/dumbbell-set.jpg",
  },

  // Books
  {
    title: "Clean Code",
    category: "Books",
    price: 6500,
    condition: "New",
    description:
      "A well-maintained copy of Clean Code by Robert C. Martin.",
    image_url: "/images/clean-code.jpg",
  },
  {
    title: "The Pragmatic Programmer",
    category: "Books",
    price: 7500,
    condition: "Used",
    description:
      "Popular programming book covering practical software development techniques.",
    image_url: "/images/pragmatic-programmer.jpg",
  },
  {
    title: "Atomic Habits",
    category: "Books",
    price: 5500,
    condition: "New",
    description:
      "Popular personal development book in New condition with minimal wear.",
    image_url: "/images/atomic-habits.jpg",
  },

  // Gaming
  {
    title: "PlayStation 5 Console",
    category: "Gaming",
    price: 175000,
    condition: "Used",
    description:
      "PlayStation 5 console with one controller. Includes power cable and HDMI cable.",
    image_url: "/images/playstation-5.jpg",
  },
  {
    title: "Xbox Series X",
    category: "Gaming",
    price: 155000,
    condition: "New",
    description:
      "Xbox Series X console with one wireless controller. Fully functional.",
    image_url: "/images/xbox-series-x.jpg",
  },
  {
    title: "Nintendo Switch OLED",
    category: "Gaming",
    price: 105000,
    condition: "New",
    description:
      "Nintendo Switch OLED with dock, Joy-Con controllers and original accessories.",
    image_url: "/images/nintendo-switch-oled.jpg",
  },
  {
    title: "Gaming Keyboard and Mouse",
    category: "Gaming",
    price: 18000,
    condition: "New",
    description:
      "Mechanical gaming keyboard and RGB gaming mouse suitable for PC gaming.",
    image_url: "/images/gaming-keyboard-mouse.jpg",
  },

  // Clothing
  {
    title: "Men's Denim Jacket",
    category: "Clothing",
    price: 8500,
    condition: "New",
    description:
      "Classic blue denim jacket in New condition. Medium size.",
    image_url: "/images/denim-jacket.jpg",
  },
  {
    title: "Women's Winter Coat",
    category: "Clothing",
    price: 12000,
    condition: "New",
    description:
      "Warm winter coat suitable for cold weather. Lightly used.",
    image_url: "/images/winter-coat.jpg",
  },
  {
    title: "Casual Cotton T-Shirt",
    category: "Clothing",
    price: 3500,
    condition: "New",
    description:
      "Comfortable cotton casual T-shirt. Brand new and available in medium size.",
    image_url: "/images/cotton-tshirt.jpg",
  },

  // Other
  {
    title: "Bluetooth Portable Speaker",
    category: "Other",
    price: 14000,
    condition: "New",
    description:
      "Portable Bluetooth speaker with New sound quality and long battery life.",
    image_url: "/images/bluetooth-speaker.jpg",
  },
  {
    title: "LED Desk Lamp",
    category: "Other",
    price: 7500,
    condition: "New",
    description:
      "Adjustable LED desk lamp suitable for studying, reading and office work.",
    image_url: "/images/led-desk-lamp.jpg",
  },
  {
    title: "Backpack",
    category: "Other",
    price: 9000,
    condition: "New",
    description:
      "Durable everyday backpack with multiple compartments for books and laptops.",
    image_url: "/images/backpack.jpg",
  },
];

const insertUser = db.prepare(`
  INSERT INTO users (
    name,
    email,
    password
  )
  VALUES (
    @name,
    @email,
    @password
  )
`);

const insertListing = db.prepare(`
  INSERT INTO listings (
    user_id,
    title,
    category,
    price,
    condition,
    description,
    image_url
  )
  VALUES (
    @user_id,
    @title,
    @category,
    @price,
    @condition,
    @description,
    @image_url
  )
`);

const seed = db.transaction(() => {
  // Clear existing seed data
  db.prepare("DELETE FROM listings").run();
  db.prepare("DELETE FROM users").run();

  // Hash password for development users
  const passwordHash = bcrypt.hashSync("Password123", 10);

  // Create development users
  const user1 = insertUser.run({
    name: "Maleesha",
    email: "maleesha@example.com",
    password: passwordHash,
  });

  const user2 = insertUser.run({
    name: "Test User",
    email: "test@example.com",
    password: passwordHash,
  });

  const maleeshaUserId = Number(user1.lastInsertRowid);
  const testUserId = Number(user2.lastInsertRowid);

  // Create listings and assign an owner
  listings.forEach((listing, index) => {
    const userId = index % 2 === 0
      ? maleeshaUserId
      : testUserId;

    insertListing.run({
      user_id: userId,
      ...listing,
    });
  });
});

seed();

console.log(
  `${listings.length} listings seeded successfully with 2 users.`
);