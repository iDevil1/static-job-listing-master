let parentContainer = document.querySelector(".parent-container");
let allContainer = document.querySelector(".all-container");
let filteredJobs = document.createElement("div");
filteredJobs.classList.add("filtered-jobs");

let filterdSubContainer = document.createElement("div");
filterdSubContainer.classList.add("filterd-sub-container");

let clearButton = document.createElement("button");
clearButton.classList.add("clear");
clearButton.innerText = "Clear";

async function fetchData() {
  const json = await fetch("./data.json");
  const data = await json.json();
  createElement(data);
  document.querySelectorAll(".skill").forEach((skill) => {
    skill.onclick = (e) => {
      allContainer.parentElement.style.justifyContent = "start";
      allContainer.parentElement.style.gap = "50px";

      let clone = e.target.cloneNode(true);
      clone.classList.remove("skill");
      clone.classList.add("filtered-skill");

      if (!e.target.classList.contains("active")) {
        filterdSubContainer.appendChild(clone);
      }
      clone.onclick = () => {
        skill.classList.remove("active");

        // Remove the filtered skill
        clone.remove();

        // After removing the skill, reapply the filter
        if (document.querySelectorAll(".filtered-skill").length > 0) {
          applyFilter();
        } else {
          // If no filtered skills remain, show all containers
          showAllContainers();
        }
        function applyFilter() {
          document
            .querySelectorAll(".skills-info-container")
            .forEach((skillsContainer) => {
              let showContainer = false;

              document.querySelectorAll(".filtered-skill").forEach((fSkill) => {
                if (skillsContainer.innerText.includes(fSkill.innerText)) {
                  showContainer = true;
                }
              });

              // Show or hide the parent container based on the presence of filtered skills

              skillsContainer.parentElement.style.display = showContainer
                ? "flex"
                : "none";
            });
        }
        function showAllContainers() {
          document
            .querySelectorAll(".skills-info-container")
            .forEach((skillsContainer) => {
              skillsContainer.parentElement.style.display = "flex";
            });
        }
      };

      document.querySelectorAll(".skill").forEach((skill) => {
        if (e.target.innerText === skill.innerText) {
          skill.classList.add("active");
        }
      });

      filteredJobs.appendChild(filterdSubContainer);
      filteredJobs.append(clearButton);

      parentContainer.prepend(filteredJobs);

      clearButton.onclick = (e) => {
        document.querySelectorAll(".filtered-skill").forEach((fSkill) => {
          document.querySelectorAll(".skill").forEach((skill) => {
            if (fSkill.innerText === skill.innerText) {
              skill.classList.remove("active");
            }
          });

          fSkill.remove();
        });
        document
          .querySelectorAll(".skills-info-container")
          .forEach((skillsContainer) => {
            skillsContainer.parentElement.style.display = "flex";
          });
        allContainer.parentElement.style.justifyContent = "center";
        e.target.parentElement.remove();
      };
      document.querySelectorAll(".container").forEach((container) => {
        container
          .querySelectorAll(".skills-info-container")
          .forEach((skillsContainer) => {
            if (!skillsContainer.innerText.includes(e.target.innerText)) {
              container.style.display = "none";
            }
          });
      });
    };
  });
}

fetchData();

function createElement(data) {
  for (let i = 0; i < data.length; i++) {
    let container = document.createElement("div");
    container.classList.add("container");
    container.id = data[i].id;
    allContainer.appendChild(container);

    let jobInfoContainer = document.createElement("div");
    jobInfoContainer.classList.add("job-info-container");

    let logo = document.createElement("img");
    logo.classList.add("logo");
    logo.src = data[i].logo;
    jobInfoContainer.appendChild(logo);

    let mainSubContainer = document.createElement("div");
    mainSubContainer.classList.add("main-sub-container");

    let subContainer1 = document.createElement("div");
    subContainer1.classList.add("sub-container-1");

    let companyName = document.createElement("span");
    companyName.classList.add("company-name");
    companyName.innerText = data[i].company;
    subContainer1.appendChild(companyName);

    if (data[i].new) {
      let newJob = document.createElement("span");
      newJob.classList.add("new-job");
      newJob.innerText = "NEW!";
      subContainer1.appendChild(newJob);
    }
    if (data[i].featured) {
      let featuredJob = document.createElement("span");
      featuredJob.classList.add("featured-job");
      featuredJob.innerText = "FEATURED";
      subContainer1.appendChild(featuredJob);
    }

    if (data[i].featured && data[i].new) {
      container.style.borderLeft = "4px solid #5ea2a2";
    }

    let subContainer2 = document.createElement("div");
    subContainer2.classList.add("sub-container-2");

    let jobPosition = document.createElement("div");
    jobPosition.classList.add("job-position");
    jobPosition.innerText = data[i].position;
    subContainer2.appendChild(jobPosition);

    let subContainer3 = document.createElement("div");
    subContainer3.classList.add("sub-container-3");

    let postedAt = document.createElement("span");
    postedAt.classList.add("posted-at");
    postedAt.innerText = data[i].postedAt;
    subContainer3.appendChild(postedAt);

    let contract = document.createElement("span");
    contract.classList.add("contract");
    contract.innerText = data[i].contract;
    subContainer3.appendChild(contract);

    let location = document.createElement("span");
    location.classList.add("location");
    location.innerText = data[i].location;
    subContainer3.appendChild(location);

    mainSubContainer.appendChild(subContainer1);
    mainSubContainer.appendChild(subContainer2);
    mainSubContainer.appendChild(subContainer3);
    jobInfoContainer.appendChild(mainSubContainer);
    container.appendChild(jobInfoContainer);
    let skillsContainer = document.createElement("div");
    skillsContainer.classList.add("skills-info-container");

    let role = document.createElement("div");
    role.classList.add("role");
    role.classList.add("skill");
    role.innerText = data[i].role;
    skillsContainer.appendChild(role);

    let level = document.createElement("div");
    level.classList.add("level");
    level.classList.add("skill");
    level.innerText = data[i].level;
    skillsContainer.appendChild(level);

    let languagesArray = data[i].languages;
    for (let i = 0; i < languagesArray.length; i++) {
      let languages = document.createElement("div");
      languages.classList.add("languages");
      languages.classList.add("skill");
      languages.innerText = languagesArray[i];
      skillsContainer.appendChild(languages);
    }

    let toolsArray = data[i].tools;
    for (let i = 0; i < toolsArray.length; i++) {
      let tools = document.createElement("div");
      tools.classList.add("tools");
      tools.classList.add("skill");
      tools.innerText = toolsArray[i];
      skillsContainer.appendChild(tools);
    }
    container.appendChild(skillsContainer);
  }
}
