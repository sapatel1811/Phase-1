



// Circle Image Hover Effect (zoom + title alert)
let circles = document.querySelectorAll(".circle");

circles.forEach((img)=>{
  img.addEventListener("mouseenter", ()=>{
    img.style.transform = "scale(1.1)";
  });

  img.addEventListener("mouseleave", ()=>{
    img.style.transform = "scale(1)";
  });

  img.addEventListener("click", ()=>{
    alert("You clicked on a technology!");
  });
});

//Scroll Animation (fade-in effect)
window.addEventListener("scroll", ()=>{
  let elements = document.querySelectorAll(".news-card, .video-card, .circle");

  elements.forEach(el=>{
    let position = el.getBoundingClientRect().top;

    if(position < window.innerHeight - 50){
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
});

// ABOUT SECTION 
const btn = document.querySelector(".content-box button");

if(btn){
    btn.addEventListener("click", () => {
        alert("Welcome to our company ");
    });
}

// ABOUT ME RATTING 
const ratings = document.querySelectorAll(".rating-number");

ratings.forEach((el) => {
    const value = el.getAttribute("data-rating");
    el.textContent = value + " ⭐";
});

// SERVICE SECTION 
document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".right-images img");

    if(images.length === 0) return;

    let index = 0;

    images.forEach(img => img.style.display = "none");
    images[0].style.display = "block";

    setInterval(() => {

        images[index].style.display = "none";

        index = (index + 1) % images.length;

        images[index].style.display = "block";

    }, 2000);

});


// CONECT FORM 

// FORM HANDEL 
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form form");

    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault(); // page reload rokega

            alert("Message Sent Successfully");

            form.reset(); // form clear karega
        });
    }

});

// INPUTE VALIDATION 
const form = document.querySelector(".contact-form form");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const name = form.querySelector("input[type='text']").value;
        const email = form.querySelector("input[type='email']").value;

        if(name === "" || email === ""){
            alert("Please fill all required fields");
            return;
        }

        alert("Form Submitted...");
        form.reset();
    });
}

// LIVE INPUT CHECK 
const emailInput = document.querySelector("input[type='email']");

if(emailInput){
    emailInput.addEventListener("input", () => {
        if(!emailInput.value.includes("@")){
            emailInput.style.border = "2px solid red";
        } else {
            emailInput.style.border = "2px solid green";
        }
    });
}


// ZOOM EFFECT IN SERVICE SECTION 
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "0.3s";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});


// IMAGE AUTO SLIDER 
const images = document.querySelectorAll(".right-images img");

let index = 0;

setInterval(() => {
    images.forEach(img => img.style.display = "none");

    

    index++;
    if(index >= images.length){
        index = 0;
    }

}, 1000);
