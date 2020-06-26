const yariv = {};

yariv.onDomContentLoaded = function() {

    yariv.detailsToggle = document.querySelector("button#show-details-btn");
    yariv.portfolioToggle = document.querySelector("button#toggle-portfolio");
    yariv.moreProjects = document.querySelector("#more-projects");
    yariv.portfolio = document.querySelector("#portfolio");
    yariv.CVSections = document.querySelectorAll(".cv-section");

    yariv.toggleDetails = e => {
        e.target.classList.toggle("shown");
    };

    yariv.togglePortfolio = () => {
        yariv.portfolioToggle.classList.toggle("pressed");
        yariv.portfolio.classList.toggle("shown");
        yariv.moreProjects.classList.toggle("shown");

        for (let section of yariv.CVSections) {
            section.classList.toggle("blurred");
        }
    };

    yariv.clickHandler = e => {
        switch (e.target.id) {
            case "show-details-btn":
                yariv.toggleDetails(e);
                break;

            case "toggle-portfolio":
                yariv.togglePortfolio();
                break;
        }
    };

    document.addEventListener("click", e => yariv.clickHandler(e));

}

document.addEventListener("DOMContentLoaded", yariv.onDomContentLoaded);