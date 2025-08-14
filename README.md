# 🐶 Doggopedia

Doggopedia is a fun and educational mobile app that allows users to explore dog breeds and test their knowledge with interactive quizzes. It uses Wikipedia and the MediaWiki API to offer detailed information and engaging experiences for dog lovers.

---

## 📱 Features

- 🔍 **Breed Explorer**  
  Scrapes the [Wikipedia list of dog breeds](https://en.wikipedia.org/wiki/List_of_dog_breeds) to populate a searchable dropdown of dog breeds.

- 📖 **Breed Info Viewer**  
  Uses [Wikipedia’s MediaWiki API](https://en.wikipedia.org/w/api.php) to fetch detailed information and a corresponding image of the selected breed.

- 🧠 **Dog Quiz Game**  
  Uses [Wikipedia's MediaWiki API](https://en.wikipedia.org/w/api.php) to display a random dog image. The user guesses the breed name, and the app checks the answer using the **Levenshtein distance** algorithm to allow for minor spelling mistakes.

---

## 🚀 Tech Stack

- React Native
- JavaScript/TypeScript
- Wikipedia MediaWiki API
- Levenshtein distance (fuzzy string matching)
- Web scraping (for initial breed list)

---

## 🖼️ Screenshots

<p align="center">
  <img src="https://github.com/yangliudev/doggopedia2022/blob/master/PlayStore/main_screen2.png?raw=true" alt="Home Page" width="45%" />
  <img src="https://github.com/yangliudev/doggopedia2022/blob/master/PlayStore/dog_info_screen2.png?raw=true" alt="Information Page" width="45%" />
  <img src="https://github.com/yangliudev/doggopedia2022/blob/master/PlayStore/quiz_screen2.png?raw=true" alt="Quiz Page" width="45%" />
  <img src="https://github.com/yangliudev/doggopedia2022/blob/master/PlayStore/favorite_screen.png?raw=true" alt="Favorite Page" width="45%" />
</p>

---

## 📥 Download

📲 [Google Play Store Link](https://play.google.com/store/apps/details?id=com.doggopedia&fbclid=IwAR2pRAyqk3Igr_6Bwld8pZye5_QlIgGaKokJtYYlx5lP7_NeanNAIyrTr4Y)
