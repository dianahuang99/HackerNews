"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let favList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <input type="checkbox">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function submitAndAddStory(evt) {
  console.debug("submitStory", evt);
  evt.preventDefault();

  // grab the author, title, and url
  const author = $("#submit-author").val();
  const title = $("#submit-title").val();
  const url = $("#submit-url").val();

  //add the story to api
  storyList.addStory(currentUser, { title, author, url });
  $submitForm.trigger("reset");
  $submitForm.hide();

  //reset the story list so the new story shows up in html
  start();
}

$submitForm.on("submit", submitAndAddStory);

//ask when to use change and when to use click
// $(":checkbox").on("change", function (evt) {
//   if (evt.target.checked) {
//     // addToFavorites(currentUser, evt.target.parentElement.id);
//     console.log("checked");
//     console.log(this);
//     console.log(evt.target);
//   } else {
//     console.log("unchecked");
//   }
// });

$("body").on("click", ":checkbox", function (evt) {
  if (this.checked) {
    currentUser.addToFavorites(currentUser, evt.target.parentElement.id);
  } else {
    console.log("unchecked");
  }
});

//puts fav stories in html
function putFavStoriesOnPage() {
  console.debug("putStoriesOnPage");

  if (currentUser.favorites.length !== 0) {
    $favStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favStoriesList.append($story);
    }
    $favStoriesList.show();
  }
}

function stayCheckedIfFav() {
  $("#fav-stories-list li :checkbox").attr("checked", true);
}

function favCheck() {
  const favListArray = [];
  undefined;
  for (let story of currentUser.favorites) {
    favListArray.push(story.storyId);
  }

  const ul = $("li");
  for (let li of ul) {
    if (favListArray.includes(li.id)) {
      li.children[0].checked = true;
    }
  }
}
