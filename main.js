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
<span class="t-out">Application 'production-app' Synced</span> <span class="t-ok">&check;</span>`;

function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function scrollTerminalToBottom(body) {
    body.scrollTop = body.scrollHeight;
}

function handleTerminalCommand(cmd, live, body) {
    var c = cmd.trim().toLowerCase();
    if (c === "") return;
    if (c === "clear") {
        live.innerHTML = "";
        return;
    }

    var responses = {
        "help": "Available commands: whoami, about, skills, experience, projects, contact, ls, date, clear",
        "whoami": "Salman Khan &mdash; DevOps &amp; Cloud Associate Engineer, based in Lahore, Pakistan.",
        "about": "DevOps &amp; Cloud Associate with hands-on experience in Docker, Kubernetes, AWS, Terraform, Jenkins, GitHub Actions, Argo CD, Prometheus &amp; Grafana.",
        "skills": "Linux &middot; Docker &middot; Kubernetes &middot; Helm &middot; AWS &middot; Azure &middot; Terraform &middot; Ansible &middot; Jenkins &middot; GitHub Actions &middot; Argo CD &middot; Prometheus &middot; Grafana &rarr; scrolling to Skills&hellip;",
        "experience": "DevOps Intern @ Rhombix Technologies (Nov 2025&ndash;Feb 2026) &middot; DevOps Associate @ Corvids Lab &rarr; scrolling to Experience&hellip;",
        "projects": "K8s GitOps deployment &middot; Jenkins CI/CD pipeline &middot; Prometheus/Grafana monitoring &middot; CRM automation &rarr; scrolling to Projects&hellip;",
        "contact": "cloudchamp0325@gmail.com &middot; +92 348 7587794 &rarr; scrolling to Contact&hellip;",
        "date": new Date().toString(),
        "ls": "about.txt&nbsp;&nbsp;experience.log&nbsp;&nbsp;projects/&nbsp;&nbsp;skills.json&nbsp;&nbsp;contact.sh",
        "sudo": "Nice try 😄 &mdash; you don't have root access here.",
        "pwd": "/home/salman/portfolio"
    };

    var sectionMap = { "skills": "Skills", "experience": "experience", "projects": "myProjectsHalfScreen", "contact": "contact", "about": "about" };

    var out = document.createElement("div");
    out.className = "term-output";

    if (Object.prototype.hasOwnProperty.call(responses, c)) {
        out.innerHTML = responses[c];
        live.appendChild(out);
        if (sectionMap[c]) {
            setTimeout(function () {
                var el = document.getElementById(sectionMap[c]);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 500);
        }
    } else {
        out.innerHTML = "command not found: " + escapeHtml(cmd) + " &mdash; type 'help' for available commands";
        live.appendChild(out);
    }
    scrollTerminalToBottom(body);
}

function promptLine(live, body) {
    var line = document.createElement("div");
    line.className = "term-line";
    line.innerHTML = '<span class="t-prompt">salman@devops</span><span class="t-out">:~$</span> <input type="text" class="term-input" autocomplete="off" spellcheck="false" aria-label="Terminal command input">';
    live.appendChild(line);
    var input = line.querySelector(".term-input");
    input.focus();
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            var cmd = input.value;
            input.disabled = true;
            line.innerHTML = '<span class="t-prompt">salman@devops</span><span class="t-out">:~$</span> ' + escapeHtml(cmd);
            handleTerminalCommand(cmd, live, body);
            promptLine(live, body);
        }
    });
    scrollTerminalToBottom(body);
}

function initInteractiveTerminal() {
    var body = document.getElementById("terminal-body");
    var cursor = document.querySelector(".typed-cursor");
    if (cursor) cursor.remove();

    body.classList.add("terminal-interactive");

    var hint = document.createElement("div");
    hint.className = "term-hint";
    hint.textContent = "Type 'help' to see available commands.";
    body.appendChild(hint);

    var live = document.createElement("div");
    live.id = "terminal-live";
    body.appendChild(live);

    body.addEventListener("click", function () {
        var active = live.querySelector(".term-input:not(:disabled)");
        if (active) active.focus();
    });

    promptLine(live, body);
}

var terminalObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            new Typed("#terminal-text", {
                strings: [terminalSession],
                typeSpeed: 18,
                startDelay: 200,
                showCursor: true,
                cursorChar: "▋",
                contentType: "html",
                loop: false,
                onComplete: initInteractiveTerminal
            });
            terminalObserver.disconnect();
        }
    });
}, { threshold: 0.35 });

terminalObserver.observe(document.getElementById("terminal-showcase"));

var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
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