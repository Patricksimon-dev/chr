// app.js

// MOBILE MENU

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.setAttribute("aria-expanded", "false");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
});


// NAVBAR SCROLL EFFECT

window.addEventListener("scroll", () => {

  const navbar = document.querySelector(".navbar");

  if(window.scrollY > 10){
    navbar.classList.add("active");
  }else{
    navbar.classList.remove("active");
  }

});


// COUNTDOWN TIMER

const sundayService = {
  day: 0,
  hour: 7,
  minute: 30,
  durationMinutes: 180,
  label: "Sunday Worship",
};

function getUpcomingSundayService(now) {
  const nextService = new Date(now);
  const deltaDays = (sundayService.day - nextService.getDay() + 7) % 7;
  nextService.setDate(nextService.getDate() + deltaDays);
  nextService.setHours(sundayService.hour, sundayService.minute, 0, 0);

  if (deltaDays === 0 && nextService <= now) {
    nextService.setDate(nextService.getDate() + 7);
  }

  return nextService;
}

function getCurrentWeekSundayService(now) {
  const currentService = new Date(now);
  const deltaDays = (currentService.getDay() + 7) % 7;
  currentService.setDate(currentService.getDate() - deltaDays);
  currentService.setHours(sundayService.hour, sundayService.minute, 0, 0);
  return currentService;
}

function getServiceEnd(start) {
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + sundayService.durationMinutes);
  return end;
}

const countdownLabel = document.querySelector(".countdown-section h2");

const countdown = setInterval(() => {
  const now = new Date();
  const nextServiceStart = getUpcomingSundayService(now);
  const currentServiceStart = getCurrentWeekSundayService(now);
  const currentServiceEnd = getServiceEnd(currentServiceStart);

  let targetDate = nextServiceStart;
  let labelText = `Next ${sundayService.label} Starts In`;

  if (now >= currentServiceStart && now <= currentServiceEnd) {
    targetDate = currentServiceEnd;
    labelText = `${sundayService.label} Ends In`;
  }

  const distance = targetDate.getTime() - now.getTime();
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (countdownLabel) {
    countdownLabel.innerText = labelText;
  }

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}, 1000);


// SERMON FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const sermonCards = document.querySelectorAll(".sermon-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    const filter = button.dataset.filter;

    sermonCards.forEach(card => {

      if(filter === "all"){
        card.style.display = "block";
      }
      else if(card.classList.contains(filter)){
        card.style.display = "block";
      }
      else{
        card.style.display = "none";
      }

    });

  });

});


// CONTACT FORM ALERT

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {

  e.preventDefault();

  alert("Prayer Request Submitted Successfully!");

  contactForm.reset();

});


// FADE IN ANIMATION

const sections = document.querySelectorAll("section");

function revealSections() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < window.innerHeight - 100) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0px)";
    }
  });
}

window.addEventListener("scroll", revealSections);

// INITIAL SECTION STYLE
sections.forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "1s";
});

// Reveal visible sections immediately on page load
revealSections();

/*function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY',

    email: 'member@email.com',

    amount: 5000 * 100,

    currency: 'NGN',

    callback: function(response) {
      alert('Payment successful!');
    },

    onClose: function() {
      alert('Transaction cancelled');
    }
  });

  handler.openIframe();
}*/

window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
/* customize formbutton below*/     
formbutton("create", {
  action: "https://formspree.io/f/xgoqbaww",
  title: "How can we help?",
  fields: [
    { 
      type: "email", 
      label: "Email:", 
      name: "email",
      required: true,
      placeholder: "your@email.com"
    },
    {
      type: "textarea",
      label: "Message:",
      name: "message",
      placeholder: "What's on your mind?",
    },
    { type: "submit" }      
  ],
  styles: {
    title:{
      backgroundColor: "gray"
    },
    button: {
      backgroundColor: "gray"
    }
  }
});

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "8b8a88e0-77d0-475f-8c48-d771b156c4d4");

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      form.reset();
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

