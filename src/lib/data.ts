import type { Category, Product } from "@/types";
import pizzaImg from '@/assets/images/Pizza.png';
import specialPizzaImg from '@/assets/images/Pizza.png';
import burgerImg from '@/assets/images/Foodies Burgers.png';
import friesImg from '@/assets/images/Fires.png';
import broastImg from '@/assets/images/Foodies Broost.png';
import nuggetImg from '@/assets/images/Chicken Nuggets.png';
import wingsImg from '@/assets/images/Hot Wings.png';
import shawarmaImg from '@/assets/images/Shawarma.png';
import pastaImg from '@/assets/images/Foodies Pasta.png';
import drinkImg from '@/assets/images/Drink.png';
import riceImg from '@/assets/images/foodies Rice.png';
import saladImg from '@/assets/images/salad.jpg';
import deal1Img from '@/assets/images/deal1.png';
import deal2Img from '@/assets/images/deal2.png';
import deal3Img from '@/assets/images/deal3.png';
import deal4Img from '@/assets/images/deal4.png';
import deal5Img from '@/assets/images/deal5.png';
import deal6Img from '@/assets/images/deal6.png';
import deal7Img from '@/assets/images/deal7.png';
import deal8Img from '@/assets/images/deal8.png';
import deal9Img from '@/assets/images/deal9.png';
import deal10Img from '@/assets/images/deal10.png';
import deal11Img from '@/assets/images/deal11.png';
import deal12Img from '@/assets/images/deal12.png';
import rollImg from '@/assets/images/Foodies Roll.png';

export const CATEGORIES: Category[] = [
    { id: 1, name: "Pizza", slug: "pizza" },
    { id: 2, name: "Burgers", slug: "burgers" },
    { id: 3, name: "Rolls", slug: "rolls" },
    { id: 4, name: "Shawarma", slug: "shawarma" },
    { id: 5, name: "Pasta", slug: "pasta" },
    { id: 6, name: "Snacks", slug: "snacks" },
    { id: 7, name: "Broast", slug: "broast" },
    { id: 8, name: "Drinks", slug: "drinks" },
    { id: 9, name: "Deals", slug: "deals" },
    { id: 10, name: "Sides", slug: "sides" },
];

export const PRODUCTS: Product[] = [
    // --- Regular Pizza ---
    { id: 101, name: "Tikka Pizza (Small)", category_id: 1, price: 500, is_available: true, image: pizzaImg },
    { id: 102, name: "Tikka Pizza (Medium)", category_id: 1, price: 850, is_available: true, image: pizzaImg },
    { id: 103, name: "Tikka Pizza (Large)", category_id: 1, price: 1250, is_available: true, image: pizzaImg },
    { id: 104, name: "Tikka Pizza (XL)", category_id: 1, price: 1700, is_available: true, image: pizzaImg },
    { id: 105, name: "Fajita Pizza (Small)", category_id: 1, price: 500, is_available: true, image: pizzaImg },
    { id: 106, name: "Fajita Pizza (Medium)", category_id: 1, price: 850, is_available: true, image: pizzaImg },
    { id: 107, name: "Fajita Pizza (Large)", category_id: 1, price: 1250, is_available: true, image: pizzaImg },
    { id: 108, name: "Fajita Pizza (XL)", category_id: 1, price: 1700, is_available: true, image: pizzaImg },
    { id: 109, name: "Chicken Achari Pizza (Small)", category_id: 1, price: 500, is_available: true, image: pizzaImg },
    { id: 110, name: "Chicken Achari Pizza (Medium)", category_id: 1, price: 850, is_available: true, image: pizzaImg },
    { id: 111, name: "Chicken Achari Pizza (Large)", category_id: 1, price: 1250, is_available: true, image: pizzaImg },
    { id: 112, name: "Chicken Achari Pizza (XL)", category_id: 1, price: 1700, is_available: true, image: pizzaImg },
    { id: 113, name: "Chicken Tandoori Pizza (Small)", category_id: 1, price: 500, is_available: true, image: pizzaImg },
    { id: 114, name: "Chicken Tandoori Pizza (Medium)", category_id: 1, price: 850, is_available: true, image: pizzaImg },
    { id: 115, name: "Chicken Tandoori Pizza (Large)", category_id: 1, price: 1250, is_available: true, image: pizzaImg },
    { id: 116, name: "Chicken Tandoori Pizza (XL)", category_id: 1, price: 1700, is_available: true, image: pizzaImg },
    { id: 117, name: "Veg Lover Pizza (Small)", category_id: 1, price: 500, is_available: true, image: pizzaImg },
    { id: 118, name: "Veg Lover Pizza (Medium)", category_id: 1, price: 850, is_available: true, image: pizzaImg },
    { id: 119, name: "Veg Lover Pizza (Large)", category_id: 1, price: 1250, is_available: true, image: pizzaImg },
    { id: 120, name: "Veg Lover Pizza (XL)", category_id: 1, price: 1700, is_available: true, image: pizzaImg },
    { id: 121, name: "Cheese Lover Pizza (Small)", category_id: 1, price: 500, is_available: true, image: pizzaImg },
    { id: 122, name: "Cheese Lover Pizza (Medium)", category_id: 1, price: 850, is_available: true, image: pizzaImg },
    { id: 123, name: "Cheese Lover Pizza (Large)", category_id: 1, price: 1250, is_available: true, image: pizzaImg },
    { id: 124, name: "Cheese Lover Pizza (XL)", category_id: 1, price: 1700, is_available: true, image: pizzaImg },

    // --- Special Pizza ---
    { id: 151, name: "Foodies Special Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 152, name: "Foodies Special Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 153, name: "Foodies Special Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 154, name: "Foodies Special Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },
    { id: 155, name: "Creamy Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 156, name: "Creamy Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 157, name: "Creamy Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 158, name: "Creamy Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },
    { id: 159, name: "Seekh Kabab Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 160, name: "Seekh Kabab Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 161, name: "Seekh Kabab Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 162, name: "Seekh Kabab Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },
    { id: 163, name: "Crown Crust Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 164, name: "Crown Crust Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 165, name: "Crown Crust Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 166, name: "Crown Crust Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },
    { id: 167, name: "Lazania Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 168, name: "Lazania Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 169, name: "Lazania Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 170, name: "Lazania Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },
    { id: 171, name: "Steak Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 172, name: "Steak Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 173, name: "Steak Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 174, name: "Steak Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },
    { id: 175, name: "Kabab Crust Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 176, name: "Kabab Crust Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 177, name: "Kabab Crust Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 178, name: "Kabab Crust Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },
    { id: 179, name: "Stufed Crust Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 180, name: "Stufed Crust Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 181, name: "Stufed Crust Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 182, name: "Stufed Crust Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },
    { id: 183, name: "Behari Kabab Pizza (Small)", category_id: 1, price: 650, is_available: true, image: specialPizzaImg },
    { id: 184, name: "Behari Kabab Pizza (Medium)", category_id: 1, price: 999, is_available: true, image: specialPizzaImg },
    { id: 185, name: "Behari Kabab Pizza (Large)", category_id: 1, price: 1450, is_available: true, image: specialPizzaImg },
    { id: 186, name: "Behari Kabab Pizza (XL)", category_id: 1, price: 1999, is_available: true, image: specialPizzaImg },

    // --- Chicken Fried Rice ---
    { id: 1001, name: "Chicken Fried Rice (Half)", category_id: 10, price: 400, is_available: true, image: riceImg },
    { id: 1002, name: "Chicken Fried Rice (Full)", category_id: 10, price: 750, is_available: true, image: riceImg },

    // --- Other Items ---
    { id: 1003, name: "Rassion Salat", category_id: 10, price: 350, is_available: true, image: saladImg },
    { id: 1004, name: "Crispy Wrap", category_id: 10, price: 600, is_available: true, image: rollImg },

    // --- Foodies Burgers ---
    { id: 201, name: "Zingar Burger", category_id: 2, price: 320, is_available: true, image: burgerImg },
    { id: 202, name: "Patty Burger", category_id: 2, price: 280, is_available: true, image: burgerImg },
    { id: 203, name: "Zingar Tower Bager", category_id: 2, price: 450, is_available: true, image: burgerImg },
    { id: 204, name: "Foodies Special Burger", category_id: 2, price: 550, is_available: true, image: burgerImg },

    // --- Foodies Rolls ---
    { id: 301, name: "Paratha Roll", category_id: 3, price: 300, is_available: true, image: rollImg },
    { id: 302, name: "Kabab Paratha Roll", category_id: 3, price: 350, is_available: true, image: rollImg },
    { id: 303, name: "Zinger Roll", category_id: 3, price: 370, is_available: true, image: rollImg },
    { id: 304, name: "Behari Roll", category_id: 3, price: 300, is_available: true, image: rollImg },
    { id: 305, name: "Behari Kabab Roll", category_id: 3, price: 350, is_available: true, image: rollImg },
    { id: 306, name: "Foodies Special Roll", category_id: 3, price: 400, is_available: true, image: rollImg },

    // --- Foodies Broast ---
    { id: 701, name: "Chicken Broast Leg", category_id: 7, price: 350, is_available: true, image: broastImg },
    { id: 702, name: "Chicken Broast Chest", category_id: 7, price: 400, is_available: true, image: broastImg },

    // --- Foodies Snacks ---
    { id: 601, name: "Regular Fries", category_id: 6, price: 200, is_available: true, image: friesImg },
    { id: 602, name: "Large Fries", category_id: 6, price: 300, is_available: true, image: friesImg },
    { id: 603, name: "Family Fries", category_id: 6, price: 400, is_available: true, image: friesImg },
    { id: 604, name: "Myo Garlic Fries", category_id: 6, price: 350, is_available: true, image: friesImg },
    { id: 605, name: "Masala Fries", category_id: 6, price: 300, is_available: true, image: friesImg },
    { id: 606, name: "Cheese Fries", category_id: 6, price: 400, is_available: true, image: friesImg },
    { id: 607, name: "Loaded Fries", category_id: 6, price: 450, is_available: true, image: friesImg },
    { id: 608, name: "10 Hot Wings", category_id: 6, price: 500, is_available: true, image: wingsImg },
    { id: 609, name: "10 Nugget", category_id: 6, price: 500, is_available: true, image: nuggetImg },
    { id: 610, name: "10 Hot Shot", category_id: 6, price: 500, is_available: true, image: broastImg },

    // --- Foodies Pasta ---
    { id: 501, name: "Malai Boti Pasta (Half)", category_id: 5, price: 400, is_available: true, image: pastaImg },
    { id: 502, name: "Malai Boti Pasta (Full)", category_id: 5, price: 600, is_available: true, image: pastaImg },
    { id: 503, name: "Creamy Pasta (Half)", category_id: 5, price: 450, is_available: true, image: pastaImg },
    { id: 504, name: "Creamy Pasta (Full)", category_id: 5, price: 750, is_available: true, image: pastaImg },
    { id: 505, name: "Foodies Special Pasta (Half)", category_id: 5, price: 450, is_available: true, image: pastaImg },
    { id: 506, name: "Foodies Special Pasta (Full)", category_id: 5, price: 750, is_available: true, image: pastaImg },
    { id: 507, name: "BBQ Pasta (Half)", category_id: 5, price: 450, is_available: true, image: pastaImg },
    { id: 508, name: "BBQ Pasta (Full)", category_id: 5, price: 750, is_available: true, image: pastaImg },

    // --- Shawarma ---
    { id: 401, name: "Chicken Shawarma", category_id: 4, price: 150, is_available: true, image: shawarmaImg },
    { id: 402, name: "Zingar Shawarma", category_id: 4, price: 250, is_available: true, image: shawarmaImg },
    { id: 403, name: "Zingar Cheese Shawarma", category_id: 4, price: 300, is_available: true, image: shawarmaImg },

    // --- Drinks ---
    { id: 801, name: "Drink 345ml", category_id: 8, price: 80, is_available: true, image: drinkImg },
    { id: 802, name: "Drink 500ml", category_id: 8, price: 120, is_available: true, image: drinkImg },
    { id: 803, name: "Drink 1ltr", category_id: 8, price: 140, is_available: true, image: drinkImg },
    { id: 804, name: "Drink 1.5ltr", category_id: 8, price: 200, is_available: true, image: drinkImg },
    // Deals
    { id: 901, name: "Deal 1", description: "1 Zinger Burger, 1 Regular Fries, 1 345ml Drink", category_id: 9, price: 570, is_available: true, image: deal1Img },
    { id: 902, name: "Deal 2", description: "2 Zinger Burger, 1 Regular Fries, 1 500ml Drink", category_id: 9, price: 900, is_available: true, image: deal2Img },
    { id: 903, name: "Deal 3", description: "4 Zinger Burger, 1 1ltr Drink", category_id: 9, price: 1400, is_available: true, image: deal3Img },
    { id: 904, name: "Deal 4", description: "20 Hot Wings, 1 500ml Drink", category_id: 9, price: 999, is_available: true, image: deal4Img },
    { id: 905, name: "Deal 5", description: "1 Small Pizza, 1 Zinger Burger, 1 345ml Drink", category_id: 9, price: 850, is_available: true, image: deal5Img },
    { id: 906, name: "Deal 6", description: "4 Pratha Roll, 1 1ltr Drink", category_id: 9, price: 1350, is_available: true, image: deal6Img },
    { id: 907, name: "Deal 7", description: "1 Small Pizza, 1 Zinger Burger, 1 Regular Fries, 1 500ml Drink", category_id: 9, price: 1100, is_available: true, image: deal7Img },
    { id: 908, name: "Deal 8", description: "2 Small Pizza, 1 500ml Drink", category_id: 9, price: 1050, is_available: true, image: deal8Img },
    { id: 909, name: "Deal 9", description: "1 Medium Pizza, 1 Zinger Burger, 1 1ltr Drink", category_id: 9, price: 1130, is_available: true, image: deal9Img },
    { id: 910, name: "Deal 10", description: "2 Medium Pizza, 1 1ltr Drink", category_id: 9, price: 1800, is_available: true, image: deal10Img },
    { id: 911, name: "Deal 11", description: "1 Large Pizza, 10 Wings, 1 1.5ltr Drink", category_id: 9, price: 1880, is_available: true, image: deal11Img },
    { id: 912, name: "Deal 12", description: "1 Large Pizza, 1 Medium Pizza, 1 1.5ltr Drink", category_id: 9, price: 2200, is_available: true, image: deal12Img },
];
