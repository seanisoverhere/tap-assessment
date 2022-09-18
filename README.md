## URL Shortening Service (For Govtech D3 & ENP)

Hi guys! I'm submitting one project for both teams since the requirements are the same so here's my URL shortening service :-)

##### The web app has been deployed at the following link: https://tap-assessment.vercel.app/

###### I have used the following stack for my development:
1. NextJS (FE and API routes)
2. TailwindCSS 
3. Prisma (ORM)
4. PlanetScale (Database as a service)
5. Vercel (For deployment)

###### Libraries used for my FE development:
1. apisauce (http client)
2. framer-motion (for animation where finger is following your cursor)
3. use-debounce (for debouncing the resizing of grids based on innerWidth/innerHeight)

###### Few things to highlight: 
- Wrote unit tests to check if component renders and input field validation is throwing error
- Decided to go serverless so data is persisted in a relational database in PlanetScale (DB as a service)
- DB stores **autoincremented id**, **originalUrl**, **convertedUrl**, and **expireAt**
- Wrote a CI/CD pipeline script using Github Action to deploy to prod when pushed to main
- 'Borrowed' a UUID generator from stackoverflow as I originally used MD5 hashing but realised that it's not unique if the value is the same so here's the said algo:

```js
const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxx-4xxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};
```

##### What could be better?
Something I could think of at the top of my head is to create a middleware to redirect the user to the page immediately if a uuid is detected in my url. Currently, there's a few seconds buffer before the app redirects you to the correct page.
