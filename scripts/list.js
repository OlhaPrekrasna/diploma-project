const eventsStore = [
    {
        title: "INFJ Personality Type - Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2024, 2, 23, 15),
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
        type: "offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50,
    },
    {
        title: "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
        description: "New York AI Users",
        date: new Date(2024, 2, 23, 11, 30),
        image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        attendees: 43,
        category: "Technology",
        distance: 25,
    },
    {
        title: "Book 40+ Appointments Per Month Using AI and Automation",
        description: "New Jersey Business Network",
        date: new Date(2024, 2, 16, 14),
        image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        category: "Technology",
        distance: 10,
    },
    {
        title: "Dump writing group weekly meetup",
        description: "Dump writing group",
        date: new Date(2024, 2, 13, 11),
        image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 77,
        category: "Business",
        distance: 100,
    },
    {
        title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
        description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 140,
        category: "Social Activities",
        distance: 75,
    },
    {
        title: "All Nations - Manhattan Missions Church Bible Study",
        description: "Manhattan Bible Study Meetup Group",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        category: "Health and Wellbeing",
        distance: 15,
    },
];

const listContainer = document.getElementById("eventsList");

function renderList(events) {
    listContainer.innerHTML = "";
    events.forEach(event => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(JSON.stringify(event)));
        listContainer.appendChild(li);
    });
}

const selectType = document.getElementById("filterType");
const selectDistance = document.getElementById("filterDistance");
const selectCategory = document.getElementById("filterCategory");

function renderSelect(select, options) {
    select.innerHTML = '<option value="all" selected="selected">All</option>';
    options.forEach(elem => {
        const option = document.createElement("option");
        option.appendChild(document.createTextNode(elem));
        option.value = elem;
        select.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    selectType.addEventListener("change", (event) => {
        // let filteredEvents;
        // if (event.target.value == "all") {
        //     filteredEvents = eventsStore;
        // } else {
        //     filteredEvents = eventsStore.filter((elem) => {
        //         if (elem.type == event.target.value) {
        //             return elem;
        //         }
        //     })
        // }

        const filteredEvents = event.target.value == "all" ? eventsStore : eventsStore.filter((elem) => {
            if (elem.type == event.target.value) {
                return elem;
            }
        });

        renderList(filteredEvents);
    })
    
    selectDistance.addEventListener("change", (event) => {
        const filteredEvents = event.target.value == "all" ? eventsStore : eventsStore.filter((elem) => {
            if (elem.distance <= parseInt(event.target.value)) {
                return elem;
            }
        });

        renderList(filteredEvents);
    })

    const selectCategoryOptions = eventsStore.map((elem) => {
        return elem.category;
    }).filter((value, index, array) => {
        return array.indexOf(value) === index;
    }).sort();
    renderSelect(selectCategory, selectCategoryOptions);
    
    selectCategory.addEventListener("change", (event) => {
        const filteredEvents = event.target.value == "all" ? eventsStore : eventsStore.filter((elem) => {
            if (elem.category == event.target.value) {
                return elem;
            }
        });

        renderList(filteredEvents);
    })

    // render init list with all elements
    // renderList(eventsStore);
});


// нет результатов
const buttons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.event-card');
const noResults = document.querySelector('.no-results');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    let visibleCount = 0;

    cards.forEach(card => {
      const isMatch = category === 'all' || card.dataset.category === category;
      card.style.display = isMatch ? '' : 'none';
      if (isMatch) visibleCount++;
    });

    if (visibleCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  });
});










        // document.querySelectorAll('.dropdown-btn').forEach(btn => {
        //   btn.addEventListener('click', () => {
        //     const dropdown = btn.nextElementSibling;
        //     dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        //   });
        // });
    
        // document.addEventListener('click', (e) => {
        //   if (!e.target.closest('.dropdown')) {
        //     document.querySelectorAll('.dropdown-content').forEach(drop => drop.style.display = 'none');
        //   }
        // });
