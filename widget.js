// a function that parse over the json file and extract the image, name and branding
const creatingArticle = (item) => {
  const li = document.createElement("li");
  const anchor = document.createElement("a");
  const thumbnail = document.createElement("img");
  const name = document.createElement("p");
  name.className = "name";
  const branding = document.createElement("p");
  branding.className = "branding";

  // Check if there is a category attribute and if so, show it as a tooltip
  if (item.categories != null) {
    name.title = `${item.categories}`;
  }

  // Set the href attribute of the anchor tag
  anchor.href = item.url;
  thumbnail.src = item.thumbnail[0].url;

  // Set the content of the elements
  thumbnail.alt = `${item.name}`;
  name.textContent = `${item.name}`;
  branding.textContent = `${item.branding}`;

  // Append the image, name, and branding to the anchor tag
  anchor.appendChild(thumbnail);
  anchor.appendChild(name);
  anchor.appendChild(branding);

  // Append the anchor tag to the list item
  li.appendChild(anchor);
  return li;
};

// Function to create and display the list of items
const createArticleList = (newData) =>  {
  const resultDiv = document.getElementById("result");
  const ul = document.createElement("ul");

  //for every object we create an article
  newData.forEach((item) => {
    const li = creatingArticle(item);
    ul.appendChild(li);
  });

  resultDiv.appendChild(ul);
}

//getData is the function that will take the data from the api and thats why its async
async function getData() {
  try {
    const response = await fetch(
      "https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init"
    );
    const responseData = await response.json();
    const newData = responseData.list;
    createArticleList(newData);
  } catch (error) {
    alert(error);
    console.error(error);
  }
}

// Call the async function to fetch data from the API
getData();
