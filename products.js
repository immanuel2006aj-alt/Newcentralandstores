const CART_KEY = "centralStoresCart";
const ADD_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";

function playAddSound() {
  try {
    const sound = new Audio(ADD_SOUND_URL);
    sound.volume = 0.22;
    sound.play().catch(() => {});
  } catch (error) {}
}

const products = [
  // RICE & FLOURS — 15
  { id: 1, name: "Ponni Boiled Rice", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Ponni Raw Rice", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Premium Basmati Rice", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Jeera Samba Rice", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Idli Rice", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Brown Rice", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "Ragi Flour", category: "Rice & Flours", size: "500 g Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "Wheat Flour", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 9, name: "Maida Flour", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 10, name: "Rice Flour", category: "Rice & Flours", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 11, name: "Besan Flour", category: "Rice & Flours", size: "500 g Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 12, name: "Corn Flour", category: "Rice & Flours", size: "500 g Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 13, name: "Health Mix Powder", category: "Rice & Flours", size: "500 g Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 14, name: "Appam Flour", category: "Rice & Flours", size: "500 g Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 15, name: "Dosa Mix", category: "Rice & Flours", size: "500 g Pack", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },

  // PULSES & DALS — 15
  { id: 16, name: "Toor Dal", category: "Pulses & Dals", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 17, name: "Urad Dal", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 18, name: "Chana Dal", category: "Pulses & Dals", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 19, name: "Moong Dal", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 20, name: "Masoor Dal", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 21, name: "Green Gram", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 22, name: "White Chana", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 23, name: "Black Chana", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 24, name: "Rajma", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 25, name: "Kabuli Chana", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 26, name: "Horse Gram", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 27, name: "Cowpeas", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 28, name: "Soya Chunks", category: "Pulses & Dals", size: "200 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 29, name: "Roasted Gram", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },
  { id: 30, name: "Fried Gram", category: "Pulses & Dals", size: "500 g Pack", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80" },

  // OILS & GHEE — 10
  { id: 31, name: "Sunflower Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80" },
  { id: 32, name: "Groundnut Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80" },
  { id: 33, name: "Coconut Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80" },
  { id: 34, name: "Gingelly Oil", category: "Oils & Ghee", size: "500 ml Pack", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80" },
  { id: 35, name: "Mustard Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80" },
  { id: 36, name: "Cow Ghee", category: "Oils & Ghee", size: "500 ml Pack", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=700&q=80" },
  { id: 37, name: "Pure Ghee", category: "Oils & Ghee", size: "1 Litre Pack", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=700&q=80" },
  { id: 38, name: "Vanaspati", category: "Oils & Ghee", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=700&q=80" },
  { id: 39, name: "Olive Oil", category: "Oils & Ghee", size: "500 ml Pack", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80" },
  { id: 40, name: "Rice Bran Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80" },

  // MASALAS — 15
  { id: 41, name: "Turmeric Powder", category: "Masalas", size: "500 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 42, name: "Chilli Powder", category: "Masalas", size: "500 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 43, name: "Coriander Powder", category: "Masalas", size: "500 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 44, name: "Garam Masala", category: "Masalas", size: "100 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 45, name: "Sambar Powder", category: "Masalas", size: "200 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 46, name: "Rasam Powder", category: "Masalas", size: "200 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 47, name: "Chicken Masala", category: "Masalas", size: "100 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 48, name: "Mutton Masala", category: "Masalas", size: "100 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 49, name: "Biryani Masala", category: "Masalas", size: "100 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 50, name: "Pepper Powder", category: "Masalas", size: "100 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 51, name: "Cumin Seeds", category: "Masalas", size: "100 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 52, name: "Mustard Seeds", category: "Masalas", size: "100 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 53, name: "Fennel Seeds", category: "Masalas", size: "100 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 54, name: "Cardamom", category: "Masalas", size: "50 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },
  { id: 55, name: "Cloves", category: "Masalas", size: "50 g Pack", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80" },

  // BEVERAGES — 10
  { id: 56, name: "Tata Tea Gold", category: "Beverages", size: "500 g Pack", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80" },
  { id: 57, name: "Brooke Bond Tea", category: "Beverages", size: "500 g Pack", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80" },
  { id: 58, name: "Instant Coffee", category: "Beverages", size: "100 g Jar", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80" },
  { id: 59, name: "Filter Coffee Powder", category: "Beverages", size: "250 g Pack", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80" },
  { id: 60, name: "Malted Health Drink", category: "Beverages", size: "500 g Pack", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80" },
  { id: 61, name: "Chocolate Health Drink", category: "Beverages", size: "500 g Pack", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80" },
  { id: 62, name: "Lemon Drink Powder", category: "Beverages", size: "200 g Pack", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=700&q=80" },
  { id: 63, name: "Orange Drink Powder", category: "Beverages", size: "200 g Pack", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=700&q=80" },
  { id: 64, name: "Rose Milk Mix", category: "Beverages", size: "200 g Pack", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=700&q=80" },
  { id: 65, name: "Badam Drink Mix", category: "Beverages", size: "200 g Pack", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80" },

  // SNACKS — 15
  { id: 66, name: "Potato Chips", category: "Snacks", size: "150 g Pack", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80" },
  { id: 67, name: "Banana Chips", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80" },
  { id: 68, name: "Mixture", category: "Snacks", size: "250 g Pack", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80" },
  { id: 69, name: "Murukku", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80" },
  { id: 70, name: "Seedai", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80" },
  { id: 71, name: "Peanut Candy", category: "Snacks", size: "150 g Pack", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80" },
  { id: 72, name: "Marie Biscuits", category: "Snacks", size: "250 g Pack", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80" },
  { id: 73, name: "Cream Biscuits", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80" },
  { id: 74, name: "Salt Biscuits", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80" },
  { id: 75, name: "Rusk", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80" },
  { id: 76, name: "Popcorn", category: "Snacks", size: "100 g Pack", image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=700&q=80" },
  { id: 77, name: "Salted Peanuts", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1567892737950-30c4e1c5f5b5?auto=format&fit=crop&w=700&q=80" },
  { id: 78, name: "Cashew Nuts", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1567892737950-30c4e1c5f5b5?auto=format&fit=crop&w=700&q=80" },
  { id: 79, name: "Almonds", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1567892737950-30c4e1c5f5b5?auto=format&fit=crop&w=700&q=80" },
  { id: 80, name: "Raisins", category: "Snacks", size: "200 g Pack", image: "https://images.unsplash.com/photo-1567892737950-30c4e1c5f5b5?auto=format&fit=crop&w=700&q=80" },

  // HOUSEHOLD — 20
  { id: 81, name: "Garbage Bags", category: "Household", size: "1 Roll", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 82, name: "Aluminium Foil", category: "Household", size: "1 Roll", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 83, name: "Cling Film", category: "Household", size: "1 Roll", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 84, name: "Tissue Paper", category: "Household", size: "1 Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 85, name: "Kitchen Towel", category: "Household", size: "1 Roll", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 86, name: "Dishwash Bar", category: "Household", size: "200 g Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 87, name: "Dishwash Liquid", category: "Household", size: "500 ml Bottle", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 88, name: "Detergent Powder", category: "Household", size: "1 kg Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 89, name: "Detergent Bar", category: "Household", size: "250 g Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 90, name: "Floor Cleaner", category: "Household", size: "1 Litre Bottle", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 91, name: "Toilet Cleaner", category: "Household", size: "500 ml Bottle", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 92, name: "Hand Wash", category: "Household", size: "250 ml Bottle", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 93, name: "Bath Soap", category: "Household", size: "3 Soap Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 94, name: "Shampoo Sachet Pack", category: "Household", size: "1 Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 95, name: "Toothpaste", category: "Household", size: "150 g Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 96, name: "Toothbrush", category: "Household", size: "1 Piece", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 97, name: "Mosquito Coil", category: "Household", size: "10 Coils", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 98, name: "Match Box", category: "Household", size: "1 Box", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 99, name: "Agarbathi", category: "Household", size: "1 Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
  { id: 100, name: "Camphor", category: "Household", size: "100 g Pack", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" }
];

const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");
const productsHeading = document.getElementById("productsHeading");
const noProducts = document.getElementById("noProducts");
const productSearch = document.getElementById("productSearch");
const searchClear = document.getElementById("searchClear");
const bottomSearchBtn = document.getElementById("bottomSearchBtn");
const cartCount = document.getElementById("cartCount");
const bottomCartCount = document.getElementById("bottomCartCount");
const filterButtons = document.querySelectorAll(".filter-btn");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

let selectedCategory = "All";
let searchTerm = "";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function totalQuantity(cart) {
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

function updateCartCount() {
  const quantity = totalQuantity(getCart());

  if (cartCount) cartCount.textContent = quantity;
   
