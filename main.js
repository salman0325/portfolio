var typed= new Typed(".text",{
    strings: ["DevOps Engineer","SRE Engineer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

var terminalSession = `<span class="t-prompt">salman@devops</span><span class="t-out">:~$</span> <span class="t-cmd">kubectl get pods -n production</span>
NAME                      READY   STATUS    RESTARTS   AGE
frontend-7d9f8c6b-x2k1p   1/1     Running   0          2d
backend-5b7c9d4f2-m9j3k   1/1     Running   0          2d

<span class="t-prompt">salman@devops</span><span class="t-out">:~$</span> <span class="t-cmd">terraform apply -auto-approve</span>
<span class="t-out">Apply complete! Resources: 12 added, 0 changed, 0 destroyed.</span> <span class="t-ok">&check;</span>

<span class="t-prompt">salman@devops</span><span class="t-out">:~$</span> <span class="t-cmd">docker build -t devops-app:latest .</span>
<span class="t-out">Successfully built and tagged devops-app:latest</span> <span class="t-ok">&check;</span>

<span class="t-prompt">salman@devops</span><span class="t-out">:~$</span> <span class="t-cmd">argocd app sync production-app</span>
<span class="t-out">Application 'production-app' Synced</span> <span class="t-ok">&check;</span>

<span class="t-prompt">salman@devops</span><span class="t-out">:~$</span> <span class="t-cmd">_</span>`;

var typedTerminal = new Typed("#terminal-text", {
    strings: [terminalSession],
    typeSpeed: 18,
    startDelay: 400,
    showCursor: true,
    cursorChar: "▋",
    contentType: "html",
    loop: false
});

var hamburger = document.getElementById("hamburger");
var navbar = document.getElementById("navbar");

hamburger.addEventListener("click", function () {
    navbar.classList.toggle("nav-open");
    hamburger.querySelector("i").classList.toggle("bx-menu");
    hamburger.querySelector("i").classList.toggle("bx-x");
});

navbar.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("nav-open");
        hamburger.querySelector("i").classList.add("bx-menu");
        hamburger.querySelector("i").classList.remove("bx-x");
    });
});