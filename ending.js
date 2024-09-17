// JS for testimonials
const testimonials = [
    {
        quote: "“This is the best I've felt physically, mentally, and emotionally in all my 37 years. I'm eating well, exercising, and able to play with my kids.”",
        author: "Alisha S."
    },
    {
        quote: "“Tracking my nutrition has completely transformed my life. I feel more energetic and healthier.”",
        author: "James L."
    },
    {
        quote: "“I finally have control over my eating habits, and it's thanks to tracking my meals consistently.”",
        author: "Martha K."
    },
    {
        quote: "“This has made it so easy for me to reach my fitness goals and stay on track.”",
        author: "David P."
    },
    {
        quote: "“I've learned so much about my eating habits and have seen great improvements in my health.”",
        author: "Samantha T."
    },
    {
        quote: "“Using this service has helped me make better food choices and stay motivated.”",
        author: "Michael R."
    },
    {
        quote: "“The tracking tools are intuitive and have made a significant impact on my wellness journey.”",
        author: "Jessica W."
    },
    {
        quote: "“I love the detailed insights and personalized recommendations that come with tracking.”",
        author: "Daniel K."
    },
    {
        quote: "“I've seen remarkable changes in my energy levels and overall well-being since I started tracking.”",
        author: "Laura H."
    },
    {
        quote: "“The program is easy to follow and has helped me achieve my health goals.”",
        author: "Kevin B."
    },
    {
        quote: "“Tracking has given me the clarity I needed to make healthier choices consistently.”",
        author: "Rachel M."
    },
    {
        quote: "“I'm thrilled with the results and the positive impact on my lifestyle.”",
        author: "Chris J."
    }
];

const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const testimonialDots = document.querySelectorAll('.testimonial-dot'); // Dots for the testimonials

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from all testimonial dots
        testimonialDots.forEach(dot => dot.classList.remove('active'));

        // Add active class to the clicked dot
        dot.classList.add('active');

        // Update the testimonial content
        quoteElement.innerHTML = testimonials[index].quote;
        authorElement.innerText = `- ${testimonials[index].author}`;
    });
});

// JS for "Our Team"
let currentTeamFrame = 0;
const teamSlider = document.querySelector('.team-slider'); // Team slider element
const teamDots = document.querySelectorAll('.team-dot'); // Dots for the team section

// Function to switch frames for the "Our Team" section
function goToTeamFrame(frameIndex) {
    if (frameIndex === currentTeamFrame) return; // Prevent redundant actions
    currentTeamFrame = frameIndex;
    const offset = frameIndex * -100; // Slide by 100% width
    teamSlider.style.transform = `translateX(${offset}vw)`;

    // Update dot styles for the "Our Team" dots
    teamDots.forEach(dot => dot.classList.remove('active'));
    teamDots[frameIndex].classList.add('active');
}

// Assign click events to "Our Team" dots
teamDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToTeamFrame(index));
});

// JS for FAQ toggle
function toggleAnswer(element) {
    const allQuestions = document.querySelectorAll('.faq-box');

    allQuestions.forEach(question => {
        if (question !== element.parentElement) {
            question.classList.remove('active');
        }
    });

    element.parentElement.classList.toggle('active');
}
