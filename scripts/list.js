const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 75,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];

const selectType = document.getElementById("filterType");
const selectDistance = document.getElementById("filterDistance");
const selectCategory = document.getElementById("filterCategory");

function filterList() {
    // init from all events
    let filteredEvents = eventsStore;

    // filter type
    filteredEvents = selectType.value == "all" ? filteredEvents : filteredEvents.filter((elem) => {
        if (elem.type == selectType.value) {
            return elem;
        }
    });

    // filter distance
    filteredEvents = selectDistance.value == "all" ? filteredEvents : filteredEvents.filter((elem) => {
        if (elem.distance <= parseInt(selectDistance.value)) {
            return elem;
        }
    });

    // filter category
    filteredEvents = selectCategory.value == "all" ? filteredEvents : filteredEvents.filter((elem) => {
        if (elem.category == selectCategory.value) {
            return elem;
        }
    });

    return filteredEvents;
}

function renderList(events) {
  const listContainer = document.getElementById("eventsList");
  const listElemTmpl = document.getElementById("eventsListElementTmpl");
  listContainer.innerHTML = "";

  // empty results
  if (events.length === 0) {
    const noResultsTmpl = document.getElementById("eventsListNoResultsTmpl");
    listContainer.innerHTML = noResultsTmpl.innerHTML;
    return;
  }

  // render list
  events.forEach((event) => {
    // image
    listElemTmpl.getElementsByClassName("event-image")[0].src = event.image;
    
    // date
    const optionsDate = {weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC'};
    const optionsTime = {hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC'};
    const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(event.date).toUpperCase();
    const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(event.date).toUpperCase();
    listElemTmpl.getElementsByClassName("event-date")[0].innerHTML = `${formattedDate} • ${formattedTime} UTC`;
    
    // type
    listElemTmpl.getElementsByClassName("event-type")[0].innerHTML = event.type.toUpperCase();

    // title
    listElemTmpl.getElementsByClassName("event-title")[0].innerHTML = event.title;

    // category and distance
    listElemTmpl.getElementsByClassName("event-category")[0].innerHTML = event.category + " (" + event.distance + " km)";

    // attendees
    listElemTmpl.getElementsByClassName("event-attendees")[0].innerHTML = event.attendees ? event.attendees + " attendees" : "";

    // append
    const newElem = listElemTmpl.cloneNode(true);
    listContainer.insertAdjacentHTML("beforeend", newElem.innerHTML);
  });
}

function renderSelect(select, options) {
  select.innerHTML = '<option value="all" selected="selected">Any category</option>';
  options.forEach((elem) => {
    const option = document.createElement("option");
    option.appendChild(document.createTextNode(elem));
    option.value = elem;
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  selectType.addEventListener("change", (event) => {
    const filteredEvents = filterList();
    renderList(filteredEvents);
  });

  selectDistance.addEventListener("change", (event) => {
    const filteredEvents = filterList();
    renderList(filteredEvents);
  });

  const selectCategoryOptions = eventsStore
    .map((elem) => {
      return elem.category;
    })
    .filter((value, index, array) => {
      return array.indexOf(value) === index;
    })
    .sort();
  renderSelect(selectCategory, selectCategoryOptions);

  selectCategory.addEventListener("change", (event) => {
    const filteredEvents = filterList();
    renderList(filteredEvents);
  });

  // initial render list
  renderList(eventsStore);
});

