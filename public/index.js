fetch("/api/v1/todos?per_page=number").then((response) =>
  console.log(response.json())
);
//   .then((data) => console.log(data));
