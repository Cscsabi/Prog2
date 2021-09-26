const element = document.getElementById("name");
const target = document.getElementById("greeting");

element.addEventListener("keyup", function (event){
    const name = event.target.value;
    target.innerHTML = "loading";

    fetch('/hello?' + "name=" + name)
        .then(function (response) {
            return  response.text();
        })
        .then(function (text){
            target.innerHTML = text;
        }).catch(function (error) {
            alert(error.message);
    });
});

const button = document.querySelector(".btn");
button.addEventListener("click", function () {
    location.href = "../html/register.html";
});