const main = document.querySelector('.main');
const main_card = document.querySelector('.main-card');
const items = document.querySelector('.items');
const items_m = document.querySelector('.items_m');
const ham = document.querySelectorAll('.hamburger');
const home_card = document.querySelector('.home-card');
const home = document.querySelectorAll('.home-div');
const about_card = document.querySelector('.about-card');
const about = document.querySelectorAll('.person-div')
const projects_card = document.querySelector('.projects-card');
const projects = document.querySelectorAll('.code-div');
const contact_card = document.querySelector('.contact-card');
const contact = document.querySelectorAll('.contact-div');
const contact_form_div = document.querySelector('.contact-form-div');
const contact_form = document.querySelector('#contact-form');


//variables
let active_card = home_card;
let ham_state = false;
let mobile = false;

//functions
function toggle_ham() {
    let arr = [document.querySelectorAll('.home-span'),
        document.querySelectorAll('.person-span'),
        document.querySelectorAll('.code-span'),
        document.querySelectorAll('.contact-span')
    ];
    if (mobile === true) {
        if (ham_state === false) {
            setTimeout(() => arr.forEach(x => { if (x != null) x[0].style.display = "inline-block" }), 120);
            items_m.style.height = "50%";
            setTimeout(() => {
                items_m.style["flex-direction"] = "column";
            }, 120);
            ham_state = true;
        } else {
            items_m.style.height = "10%";
            setTimeout(() => items_m.style["flex-direction"] = "row", 120);
            ham_state = false;
            setTimeout(() => arr.forEach(x => { if (x != null) x[0].style.display = "none" }), 100);
        }
    } else {
        if (ham_state === false) {
            setTimeout(() => arr.forEach(x => { if (x != null) x[1].style.display = "inline-block" }), 120);
            items.style.width = "30%";
            ham_state = true;
        } else {
            items.style.width = "10%";
            ham_state = false;
            setTimeout(() => arr.forEach(x => { if (x != null) x[1].style.display = "none" }), 100);
        }
    }
}

function nav_buttons(item, item_card) {
    item.addEventListener('click', function() {
        active_card = item_card;
        if (!mobile)
            item_card.scrollIntoView({ behavior: 'smooth' });
        else setTimeout(() => item_card.scrollIntoView({ behavior: 'smooth' }), 200);
        if (ham_state === true)
            toggle_ham();
    });
}

function send_mail(mail, msg) {
    let s_params = {
        email: mail,
        message: msg
    };
    emailjs.send('<service_name>', '<template_name>', s_params)
        .then(function(res) {
            console.log("result: ", res);
        });
}

function send_notification(notification, prev) {
    const sent_notification = document.querySelector('.sent-notification');
    const message = document.querySelector('.notification-message');
    const close_button = document.querySelector('.close-button');
    message.innerText = notification;
    prev.style.display = 'none';
    sent_notification.style.display = 'flex';
    close_button.addEventListener('click', function() {
        message.innerText = '';
        sent_notification.style.display = 'none';
        prev.style.display = 'flex';
    })
}

function check_mobile() {
    let height = screen.height,
        width = screen.width;
    if (width <= 800 && width < height) {
        mobile = true;
    } else {
        mobile = false;
    }
    console.log('mobile', mobile);
}

// navigation
{
    for (let i = 0; i < 2; i++) {
        ham[i].addEventListener('click', function() {
            toggle_ham(ham_state);
        });

        nav_buttons(home[i], home_card);
        nav_buttons(about[i], about_card);
        nav_buttons(projects[i], projects_card);
        nav_buttons(contact[i], contact_card);
    }
}

//main-card buttons
{
    let resume = document.querySelector('.resume'),
        linkedin = document.querySelector('.linkedin'),
        github = document.querySelector('.github');
    resume.addEventListener('click', function() {
        window.open('<link>','_blank');
    });
    linkedin.addEventListener('click', function() {
        window.open('<link>','_blank');
    });
    github.addEventListener('click', function() {
        window.open('<link>', '_blank');
    });
}

//contact form
{
    contact_form.addEventListener('submit', function(event) {
        event.preventDefault();
        let email = document.querySelector("#email").value;
        let message = document.querySelector("#message").value;
        if (!email || !message) {
            send_notification("please don't leave the email/message empty", contact_form_div);
        } else {
            //send_mail(email,message);
            send_notification("your message has been sent", contact_form_div);
        }
        document.querySelector('#email').value = '';
        document.querySelector("#message").value = '';
    })
}

//responsiveness
{
    check_mobile();
    window.addEventListener('resize', function() {
        check_mobile();
        setTimeout(() =>
            active_card.scrollIntoView({ behavior: 'smooth' }), 500);
    });
}