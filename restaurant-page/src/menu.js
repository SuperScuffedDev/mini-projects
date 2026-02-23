const menu = [
    {
        name: "ok burger",
        price: 5,
        description: "a burger that is ok",
    } ,
    {
        name: "good burger",
        price: 50,
        description: "a burger that is good",
    } ,
    {
        name: "ultimate burger",
        price: 999,
        description: "the pinnacle of fried sandwiches",
    } ,
]

export default function(content_div) {
    menu.forEach(item => {
        const item_div = document.createElement("div");
        const item_name = document.createElement("h2");
        const item_price = document.createElement("p")
        const item_description = document.createElement("p")

        item_div.style.backgroundColor = "white"
        item_div.style.width = "100%"
        item_div.style.marginBottom = "16px"

        item_name.textContent = `${item.name}`;
        item_price.textContent = `$ ${item.price}`;
        item_description.textContent = `${item.description}`;

        item_div.append(item_name)
        item_div.append(item_price)
        item_div.append(item_description)

        content_div.append(item_div);
    });
};