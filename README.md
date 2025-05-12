# 🎖️ ️Welcome to Hoidle 🎖️

**Hoidle** is my little project inspired by **Loldle**, 
but instead of using League of Legends champions, 
it uses **Hearts of Iron IV (HOI4) countries**.

## How does it work? 🤔
- You enter the name of any country in HOI4.
- You will be given a series of clues related to a country.
- Your goal is to guess the country based on these clues.

  
### 🏷 Current Version 

Currently, the project contains only **"Classic Mode"** but I plan to add more modes in the future.

### 🕰 Plans for the nearest future 
- Accounts with personal statistics
- Guess from border shape mode
- Save your today's guesses

**_Now feel free to [check it out](https://hoidle.netlify.app/)!_**

## ⚙️ Technicals 

### 🛠️ Technologies Used:
- Frontend: HTML, LESS, JavaScript
- Backend: Java 17, Spring Boot, PostgreSQL, MySQL (used initially)
- Additional: IntelliJ IDEA, Gradle, MySQL Workbench, Docker, Git

### ❗ Important ❗

You may need to run the main application file once before running anything else; otherwise, it might not work.
At least, it worked for me this way

### 🧱Build Instructions
1. Clone the repository
2. In the Client module you should see constants.js

`client/js/common/constants.js`

where are the lines

```javascript
const dataAllCountries = 'http://localhost:8080/data/allCountries';
const sendGuessDirection = 'http://localhost:8080/game/control/guessed';
// const dataAllCountries = 'https://hoidle-1-1-0-latest.onrender.com/data/allCountries';
// const sendGuessDirection = 'https://hoidle-1-1-0-latest.onrender.com/game/control/guessed';
```
If you want to test it using my hosted backend, comment and uncomment proper lines
to use the onrender.com link and jump to the `🔗 Application Page` part.

**Although be aware that it is slow because I only use free
services for my hobby. Also my host runs the latest stable version**

Otherwise, set these constants to point to localhost 
(as it is in example) and follow down the instructions.

3. Create a local PostgreSQL database
4. Set the following environment variables:

```
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_URL=your_database_url
```

> 💡 Example:
> ```
> DATABASE_USER=data_manager
> DATABASE_PASSWORD=123
> DATABASE_URL=postgresql://host.docker.internal:5432/my_db
> ```

5. Run HoidleApplication
6. Load data from the file:

To trigger a data load for the database, send a `POST` request to:
   `http://localhost:8080/admin/from/file/csv/countries.csv`

_Thanks to my friend Filip for creating and sharing this file_

### 🔗 Application page

Please open `index.html` from **Client** module and enjoy the game!

### 🔍 Tests

To perform unit tests, you have to separately run all tests in each module.

For **Client** tests I used `jest`, so you need to go to this
module in your console and run `npm test`.

If you don't have `npm` installed, you won't be able to run client-side tests.

## 💬 My comment
**Hoidle** is an idea that my friend Filip and I came up with
after playing **Loldle** a lot. It's my first project that I really 
see as something public, something people can play. I know there's still 
a lot to do, but I'm ready to take on the challenge.

While working on it, I truly enjoyed learning more about 
JavaScript – up to now, I'd only used it for basic animations.
After completing `classic mode` for **Hoidle** I must say it's been and is
a great and fun experience.

Last but not the least, I've learned a lesson about testing.
Creating unit tests seemed really easy at first, but when 
it came to reality, sometimes tests passed but functionalities 
were far from intended. At the end of the day because of
them, I was able to catch subtle bugs and improve the code right away.

Anyway, I'm willing to continue working on **Hoidle** as soon as possible,
and I can't wait to see how far I can take this project.

## 🙏 Thank you for your time!
